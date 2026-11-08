const fs = require('fs');
const path = require('path');
const soap = require('soap');
const operations = new Set(['criarProduto','buscarProduto','listarProdutos','atualizarProduto','excluirProduto','criarVenda','buscarVenda','listarVendas','atualizarVenda','excluirVenda','adicionarProdutoNaVenda','removerProdutoDaVenda','listarProdutosDaVenda']);
module.exports = async (req,res) => {
 const url = new URL(req.url,'http://localhost');
 if(req.method==='POST' && url.pathname.startsWith('/api/')) {
  res.setHeader('Content-Type','application/json; charset=utf-8');
  try {
   const op=url.pathname.slice(5); if(!operations.has(op)) throw Error('Operação desconhecida');
   let body=''; for await(const chunk of req){body+=chunk;if(body.length>16384)throw Error('Dados muito grandes');}
   const client=await soap.createClientAsync(path.join(__dirname,'caixa.wsdl'));
   const [result]=await client[op+'Async'](JSON.parse(body||'{}'));
   res.end(JSON.stringify(result));
  }catch(e){res.statusCode=400;res.end(JSON.stringify({erro:String(e.root?.Envelope?.Body?.Fault?.Reason?.Text||e.message).replace(/^Error:\s*/, '')}));}
  return;
 }
 const files={'/':['index.html','text/html'],'/app.js':['app.js','text/javascript'],'/style.css':['style.css','text/css']};
 const file=files[url.pathname];
 if(req.method==='GET'&&file){try{const data=await fs.promises.readFile(path.join(__dirname,'../public',file[0]));res.setHeader('Content-Type',file[1]+'; charset=utf-8');res.end(data);return;}catch{}}
 res.statusCode=404;res.end('Não encontrado');
};
