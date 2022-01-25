class ListaNegociacoes {
  constructor() {
    this._negociacoes = [];
    // this._gatilho = gatilho;
    // this._contexto = contexto;
  }

  adiciona(negociacao) {
    this._negociacoes = [].concat(this._negociacoes, negociacao);
    // this._negociacoes.push(negociacao);
    // this._gatilho(this);
    // Reflect.apply(this._gatilho, this._contexto, [this]); // Dentro do [] são passados os parâmetros da função this._gatilho
  }

  get negociacoes() {
    return [].concat(this._negociacoes);
  }

  esvazia() {
    this._negociacoes = [];
  }

  get volumeTotal() {
    // return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    let total = this._negociacoes.reduce((total, n) => {
      return total + n.volume;
    }, 0.0);
    return total;
  }
}
