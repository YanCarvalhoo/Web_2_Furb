// Classe modelo da venda. Guarda os dados básicos e a lista de códigos dos
// produtos que estão nela. O relacionamento N:N com Produto é controlado aqui
// (uma venda tem vários produtos, um produto aparece em várias vendas).

class Venda {
  constructor(codigo, data, cliente) {
    this.codigo = codigo;
    this.data = data;
    this.cliente = cliente;
    this._produtos = []; // códigos dos produtos vendidos
  }

  get codigo() {
    return this._codigo;
  }

  set codigo(valor) {
    if (typeof valor !== 'string' || valor.trim() === '') {
      throw new Error('código da venda não pode ficar em branco');
    }
    this._codigo = valor.trim();
  }

  get data() {
    return this._data;
  }

  set data(valor) {
    // dd/mm/aaaa. só checo o formato, não se a data existe de verdade
    if (typeof valor !== 'string' || !/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
      throw new Error('data da venda inválida: use dd/mm/aaaa');
    }
    this._data = valor;
  }

  get cliente() {
    return this._cliente;
  }

  set cliente(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 3) {
      throw new Error('cliente inválido: não pode ficar em branco');
    }
    this._cliente = valor.trim();
  }

  get produtos() {
    return [...this._produtos];
  }

  adicionarProduto(codigo) {
    if (this._produtos.includes(codigo)) {
      throw new Error('produto já está nessa venda');
    }
    this._produtos.push(codigo);
  }

  removerProduto(codigo) {
    const i = this._produtos.indexOf(codigo);
    if (i === -1) {
      throw new Error('produto não está nessa venda');
    }
    this._produtos.splice(i, 1);
  }

  // a lista de produtos não vai aqui porque o WSDL não expõe ela direto
  toJSON() {
    return {
      codigo: this.codigo,
      data: this.data,
      cliente: this.cliente,
    };
  }
}

module.exports = Venda;
