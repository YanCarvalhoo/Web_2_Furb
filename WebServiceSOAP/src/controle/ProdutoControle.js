const Produto = require('../modelo/Produto');

// Controlador dos produtos. CRUD com um Map simulando o banco (chave = código),
// que é o que o enunciado pede. Em um projeto de verdade isso seria o BD_Caixa.

class ProdutoControle {
  constructor() {
    this._produtos = new Map();
    this._vendaControle = null; // injetado depois, pra saber se o produto está em uso
  }

  setVendaControle(vendaControle) {
    this._vendaControle = vendaControle;
  }

  criar(produto) {
    if (this._produtos.has(produto.codigo)) {
      throw new Error('já existe um produto com esse código');
    }
    this._produtos.set(produto.codigo, produto);
    return true;
  }

  buscar(codigo) {
    const p = this._produtos.get(codigo);
    if (!p) {
      throw new Error('produto não encontrado');
    }
    return p;
  }

  listar() {
    return [...this._produtos.values()];
  }

  atualizar(produto) {
    if (!this._produtos.has(produto.codigo)) {
      throw new Error('produto não encontrado');
    }
    this._produtos.set(produto.codigo, produto);
    return true;
  }

  excluir(codigo) {
    if (!this._produtos.has(codigo)) {
      throw new Error('produto não encontrado');
    }
    // não deixa excluir um produto que está dentro de alguma venda: senão a venda
    // fica com um código órfão e o listarProdutosDaVenda passa a estourar erro
    if (this._vendaControle) {
      const emUso = this._vendaControle.vendasComProduto(codigo);
      if (emUso.length > 0) {
        throw new Error('produto não pode ser excluído: está na(s) venda(s) ' + emUso.join(', '));
      }
    }
    this._produtos.delete(codigo);
    return true;
  }
}

module.exports = ProdutoControle;
