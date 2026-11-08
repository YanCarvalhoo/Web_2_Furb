// Cliente de teste. Sobe o servidor primeiro (npm start) e depois roda daqui:
//   node cliente.js
// Faz um fluxo completo de CRUD de produto e venda + o relacionamento entre
// eles e, no fim, provoca um erro de validação de propósito pra mostrar o
// SOAP Fault.

const soap = require('soap');

const URL = 'http://localhost:8000/caixa?wsdl';

// o pacote soap às vezes devolve uma lista com um único item como objeto
// (e não array), então essa função normaliza pra sempre cair num array
function lista(x) {
  if (x == null) return [];
  return Array.isArray(x) ? x : [x];
}

// extrai a mensagem de dentro do SOAP Fault (no envelope fica em Reason.Text)
function mensagemFault(err) {
  const f = err.root && err.root.Envelope && err.root.Envelope.Body && err.root.Envelope.Body.Fault;
  return f && f.Reason && f.Reason.Text ? f.Reason.Text.replace(/^Error:\s*/, '') : err.message;
}

async function main() {
  const client = await soap.createClientAsync(URL);

  console.log('=== 1. criar produtos ===');
  const [p1] = await client.criarProdutoAsync({
    produto: { codigo: 'P001', nome: 'Refrigerante 2L', preco: 8.9, estoque: 10 },
  });
  console.log('criarProduto P001 ->', p1.resultado);

  const [p2] = await client.criarProdutoAsync({
    produto: { codigo: 'P002', nome: 'Chocolate', preco: 5.5, estoque: 20 },
  });
  console.log('criarProduto P002 ->', p2.resultado);

  console.log('\n=== 2. criar venda ===');
  const [v1] = await client.criarVendaAsync({
    venda: { codigo: 'V001', data: '25/10/2026', cliente: 'Maria Souza' },
  });
  console.log('criarVenda V001 ->', v1.resultado);

  console.log('\n=== 3. adicionar produtos na venda ===');
  const [a1] = await client.adicionarProdutoNaVendaAsync({ codigoVenda: 'V001', codigoProduto: 'P001' });
  console.log('adicionar P001 ->', a1.resultado);
  const [a2] = await client.adicionarProdutoNaVendaAsync({ codigoVenda: 'V001', codigoProduto: 'P002' });
  console.log('adicionar P002 ->', a2.resultado);

  console.log('\n=== 4. listar produtos ===');
  const [lp] = await client.listarProdutosAsync({});
  console.log(JSON.stringify(lista(lp.produtos && lp.produtos.item), null, 2));

  console.log('\n=== 5. listar vendas ===');
  const [lv] = await client.listarVendasAsync({});
  console.log(JSON.stringify(lista(lv.vendas && lv.vendas.item), null, 2));

  console.log('\n=== 6. produtos da venda V001 ===');
  const [pv] = await client.listarProdutosDaVendaAsync({ codigoVenda: 'V001' });
  console.log(JSON.stringify(lista(pv.produtos && pv.produtos.item), null, 2));

  console.log('\n=== 7. buscar produto por codigo ===');
  const [bp] = await client.buscarProdutoAsync({ codigo: 'P001' });
  console.log(JSON.stringify(bp.produto, null, 2));

  console.log('\n=== 8. atualizar produto (troca o preço) ===');
  const [up] = await client.atualizarProdutoAsync({
    produto: { codigo: 'P001', nome: 'Refrigerante 2L', preco: 9.9, estoque: 9 },
  });
  console.log('atualizarProduto ->', up.resultado);
  const [bp2] = await client.buscarProdutoAsync({ codigo: 'P001' });
  console.log(JSON.stringify(bp2.produto, null, 2));

  console.log('\n=== 9. buscar e atualizar venda ===');
  const [bv] = await client.buscarVendaAsync({ codigo: 'V001' });
  console.log('buscarVenda V001 ->', JSON.stringify(bv.venda));
  const [uv] = await client.atualizarVendaAsync({
    venda: { codigo: 'V001', data: '26/10/2026', cliente: 'Maria Souza' },
  });
  console.log('atualizarVenda ->', uv.resultado);
  const [bv2] = await client.buscarVendaAsync({ codigo: 'V001' });
  console.log(JSON.stringify(bv2.venda, null, 2));

  console.log('\n=== 10. remover produto da venda + excluir produto ===');
  const [r1] = await client.removerProdutoDaVendaAsync({ codigoVenda: 'V001', codigoProduto: 'P002' });
  console.log('remover P002 ->', r1.resultado);
  const [e1] = await client.excluirProdutoAsync({ codigo: 'P002' });
  console.log('excluirProduto P002 ->', e1.resultado);
  const [lp2] = await client.listarProdutosAsync({});
  console.log('produtos restantes ->', JSON.stringify(lista(lp2.produtos && lp2.produtos.item), null, 2));

  console.log('\n=== 11. exclusão bloqueada (P001 ainda está na V001) ===');
  try {
    await client.excluirProdutoAsync({ codigo: 'P001' });
    console.log('ERRO: o serviço deixou excluir um produto que está em uso!');
  } catch (err) {
    console.log('SOAP Fault ->', mensagemFault(err));
  }
  // a venda continua íntegra: os produtos dela ainda são listáveis
  const [pv2] = await client.listarProdutosDaVendaAsync({ codigoVenda: 'V001' });
  console.log('produtos da V001 continuam ->', JSON.stringify(lista(pv2.produtos && pv2.produtos.item)));

  console.log('\n=== 12. erro de validação (preço negativo) ===');
  try {
    await client.criarProdutoAsync({
      produto: { codigo: 'P099', nome: 'Item inválido', preco: -1, estoque: 5 },
    });
  } catch (err) {
    console.log('SOAP Fault ->', mensagemFault(err));
  }

  console.log('\n=== 13. excluir venda ===');
  const [ev] = await client.excluirVendaAsync({ codigo: 'V001' });
  console.log('excluirVenda V001 ->', ev.resultado);
  const [lv2] = await client.listarVendasAsync({});
  console.log('vendas restantes ->', JSON.stringify(lista(lv2.vendas && lv2.vendas.item)));
}

main().catch((e) => {
  console.error('Erro geral no cliente:', e.message);
  process.exit(1);
});
