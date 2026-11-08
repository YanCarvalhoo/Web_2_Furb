const Venda = require('../modelo/Venda');

// Controlador das vendas. CRUD em Map + o relacionamento com Produto:
// uma venda tem vários produtos e um produto pode aparecer em várias vendas.

class VendaControle {
  constructor() {
    this._vendas = new Map();
    this._produtoControle = null; // injetado depois, pra conferir se o produto existe
  }

  setProdutoControle(produtoControle) {
    this._produtoControle = produtoControle;
  }

  criar(venda) {
    if (this._vendas.has(venda.codigo)) {
      throw new Error('já existe uma venda com esse código');
    }
    this._vendas.set(venda.codigo, venda);
    return true;
  }

  buscar(codigo) {
    const v = this._vendas.get(codigo);
    if (!v) {
      throw new Error('venda não encontrada');
    }
    return v;
  }

  listar() {
    return [...this._vendas.values()];
  }

  atualizar(venda) {
    const atual = this._vendas.get(venda.codigo);
    if (!atual) {
      throw new Error('venda não encontrada');
    }
    // o objeto novo chega só com codigo/data/cliente, então os produtos da venda
    // (o relacionamento N:N) precisam ser carregados de volta antes de substituir
    for (const codigoProduto of atual.produtos) {
      venda.adicionarProduto(codigoProduto);
    }
    this._vendas.set(venda.codigo, venda);
    return true;
  }

  excluir(codigo) {
    if (!this._vendas.delete(codigo)) {
      throw new Error('venda não encontrada');
    }
    return true;
  }

  // ---- relacionamento venda x produto ----

  adicionarProduto(codigoVenda, codigoProduto) {
    const venda = this.buscar(codigoVenda);
    // antes de adicionar, confiro se o produto existe de verdade
    if (this._produtoControle) {
      this._produtoControle.buscar(codigoProduto); // lança erro se não existir
    }
    venda.adicionarProduto(codigoProduto);
    return true;
  }

  removerProduto(codigoVenda, codigoProduto) {
    const venda = this.buscar(codigoVenda);
    venda.removerProduto(codigoProduto);
    return true;
  }

  // códigos das vendas que usam esse produto. O ProdutoControle usa isso pra
  // barrar a exclusão de produto que ainda está em alguma venda.
  vendasComProduto(codigoProduto) {
    return this.listar()
      .filter((v) => v.produtos.includes(codigoProduto))
      .map((v) => v.codigo);
  }

  listarProdutosDaVenda(codigoVenda) {
    if (!this._produtoControle) {
      throw new Error('controlador de produtos não configurado');
    }
    const venda = this.buscar(codigoVenda);
    // converte os códigos de volta em objetos Produto completos
    return venda.produtos.map((c) => this._produtoControle.buscar(c));
  }
}

module.exports = VendaControle;
