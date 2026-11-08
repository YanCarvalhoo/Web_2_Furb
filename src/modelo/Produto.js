// Classe modelo do produto. Só os dados + validação de cada campo nos setters.
// Quem salva/edita/exclui é o ProdutoControle.

class Produto {
  constructor(codigo, nome, preco, estoque) {
    // passo pelos setters já aqui, pra não ter produto com campo errado rodando
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
    this.estoque = estoque;
  }

  get codigo() {
    return this._codigo;
  }

  set codigo(valor) {
    // formato P001 (letra P + 3 dígitos), igual ao padrão do módulo de estoque
    if (typeof valor !== 'string' || !/^P\d{3}$/.test(valor)) {
      throw new Error('código do produto inválido: use o formato P001');
    }
    this._codigo = valor;
  }

  get nome() {
    return this._nome;
  }

  set nome(valor) {
    if (typeof valor !== 'string' || valor.trim().length < 3) {
      throw new Error('nome do produto inválido: não pode ficar em branco');
    }
    this._nome = valor.trim();
  }

  get preco() {
    return this._preco;
  }

  set preco(valor) {
    const n = Number(valor);
    if (isNaN(n) || n <= 0) {
      throw new Error('preço inválido: tem que ser maior que zero');
    }
    this._preco = n;
  }

  get estoque() {
    return this._estoque;
  }

  set estoque(valor) {
    const n = Number(valor);
    if (!Number.isInteger(n) || n < 0) {
      throw new Error('estoque inválido: tem que ser um inteiro maior ou igual a zero');
    }
    this._estoque = n;
  }

  // devolve o produto como objeto simples, sem o _ interno. o pacote soap não
  // chama isso sozinho, então eu chamo na hora de devolver no serviço
  toJSON() {
    return {
      codigo: this.codigo,
      nome: this.nome,
      preco: this.preco,
      estoque: this.estoque,
    };
  }
}

module.exports = Produto;
