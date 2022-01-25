class NegociacaoService {
  constructor() {
    this._http = new HttpService();
  }
  obterNegociacoesDaSemana() {
    return this._http
      .get('negociacoes/semana')
      .then((negociacoes) => {
        return negociacoes.map((objeto) => {
          return new Negociacao(
            new Date(objeto.data),
            objeto.quantidade,
            objeto.valor
          );
        });
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações da semana');
      });
  }
  obterNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then((negociacoes) => {
        return negociacoes.map((objeto) => {
          return new Negociacao(
            new Date(objeto.data),
            objeto.quantidade,
            objeto.valor
          );
        });
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error(
          'Não foi possível obter as negociações da semana anterior'
        );
      });
  }
  obterNegociacoesDaSemanaRetrasada() {
    return this._http
      .get('negociacoes/retrasada')
      .then((negociacoes) => {
        return negociacoes.map((objeto) => {
          return new Negociacao(
            new Date(objeto.data),
            objeto.quantidade,
            objeto.valor
          );
        });
      })
      .catch((erro) => {
        console.log(erro);
        throw new Error(
          'Não foi possível obter as negociações da semana retrasada'
        );
      });
  }

  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then((periodos) => {
        let negociacoes = periodos.reduce((dados, periodo) => {
          return dados.concat(periodo);
        }, []);

        return negociacoes;
      })
      .catch((erro) => {
        throw new Error(erro);
      });
  }
}

/*
        ESTADOS REQUISIÇÃO AJAX
          0: requisição ainda não iniciada
          1: conexão estabelecida com o servidor
          2: requisição recebida
          3: processando requisição
          4: requisição concluída e a resposta está pronta
      */
