const http = require('http');
const fs = require('fs');
const path = require('path');
const soap = require('soap');

const Produto = require('./modelo/Produto');
const Venda = require('./modelo/Venda');
const ProdutoControle = require('./controle/ProdutoControle');
const VendaControle = require('./controle/VendaControle');

// Instancia os controladores e liga um no outro. A venda precisa do
// controlador de produto pra conferir se o produto existe antes de adicionar.
const produtos = new ProdutoControle();
const vendas = new VendaControle();
vendas.setProdutoControle(produtos);
produtos.setVendaControle(vendas); // e o contrário, pra barrar exclusão de produto em uso

// O SOAP manda os dados como objeto simples, então aqui eu reconstruo as
// classes modelo (que validam tudo nos setters). Se a validação lançar erro,
// o pacote soap transforma em SOAP Fault na resposta.
function montaProduto(obj) {
  return new Produto(obj.codigo, obj.nome, obj.preco, obj.estoque);
}

function montaVenda(obj) {
  return new Venda(obj.codigo, obj.data, obj.cliente);
}

// Objeto que espelha o WSDL: CaixaService -> CaixaPort -> operações.
// O nome de cada chave precisa bater com o <operation> do WSDL.
const service = {
  CaixaService: {
    CaixaPort: {
      criarProduto(args) {
        return { resultado: produtos.criar(montaProduto(args.produto)) };
      },
      buscarProduto(args) {
        return { produto: produtos.buscar(args.codigo).toJSON() };
      },
      listarProdutos() {
        return { produtos: { item: produtos.listar().map((p) => p.toJSON()) } };
      },
      atualizarProduto(args) {
        return { resultado: produtos.atualizar(montaProduto(args.produto)) };
      },
      excluirProduto(args) {
        return { resultado: produtos.excluir(args.codigo) };
      },

      criarVenda(args) {
        return { resultado: vendas.criar(montaVenda(args.venda)) };
      },
      buscarVenda(args) {
        return { venda: vendas.buscar(args.codigo).toJSON() };
      },
      listarVendas() {
        return { vendas: { item: vendas.listar().map((v) => v.toJSON()) } };
      },
      atualizarVenda(args) {
        return { resultado: vendas.atualizar(montaVenda(args.venda)) };
      },
      excluirVenda(args) {
        return { resultado: vendas.excluir(args.codigo) };
      },

      adicionarProdutoNaVenda(args) {
        return { resultado: vendas.adicionarProduto(args.codigoVenda, args.codigoProduto) };
      },
      removerProdutoDaVenda(args) {
        return { resultado: vendas.removerProduto(args.codigoVenda, args.codigoProduto) };
      },
      listarProdutosDaVenda(args) {
        return { produtos: { item: vendas.listarProdutosDaVenda(args.codigoVenda).map((p) => p.toJSON()) } };
      },
    },
  },
};

const wsdl = fs.readFileSync(path.join(__dirname, 'caixa.wsdl'), 'utf8');

const server = http.createServer(require('./interface'));

server.listen(8000, () => {
  soap.listen(server, '/caixa', service, wsdl);
  console.log('Servidor SOAP rodando em http://localhost:8000/caixa');
  console.log('WSDL em http://localhost:8000/caixa?wsdl');
});

