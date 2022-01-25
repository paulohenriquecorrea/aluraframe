class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document);
    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');
    let self = this;

    this._listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($('#negociacoesView')),
      'adiciona',
      'esvazia'
    );

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView($('#mensagemView')),
      'texto'
    );
  }
  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    // this._mensagemView.update(this._mensagem);
    this._limpaForm();
  }

  importaNegociacoes() {
    let service = new NegociacaoService();

    service
      .obterNegociacoes()
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) => {
          this._listaNegociacoes.adiciona(negociacao);
        });
        this._mensagem.texto = 'Negociações importadas com sucesso';
      })
      .catch((error) => {
        this._mensagem.texto = error;
      });

    // Promise.all([
    //   service.obterNegociacoesDaSemana(),
    //   service.obterNegociacoesDaSemanaAnterior(),
    //   service.obterNegociacoesDaSemanaRetrasada(),
    // ])
    //   .then((negociacoes) => {
    //     negociacoes
    //       .reduce((arrayAchatado, array) => {
    //         return arrayAchatado.concat(array);
    //       }, [])
    //       .forEach((negociacao) => {
    //         return this._listaNegociacoes.adiciona(negociacao);
    //       });
    //     this._mensagem.texto = 'Negociações importadas com sucesso';
    //   })
    //   .catch((error) => {
    //     return (this._mensagem.texto = error);
    //   });

    // negociacoesService.obterNegociacoesDaSemana((erro, negociacoes) => {
    //   if (erro) {
    //     this._mensagem.texto = erro;
    //     return;
    //   }

    //   negociacoes.forEach((negociacao) => {
    //     this._listaNegociacoes.adiciona(negociacao);
    //   });
    //   this._mensagem.texto = 'Negociações importadas com sucesso';
    // });

    // negociacoesService.obterNegociacoesDaSemanaAnterior((erro, negociacoes) => {
    //   if (erro) {
    //     this._mensagem.texto = erro;
    //     return;
    //   }

    //   negociacoes.forEach((negociacao) => {
    //     this._listaNegociacoes.adiciona(negociacao);
    //   });
    //   this._mensagem.texto = 'Negociações importadas com sucesso';
    // });

    // negociacoesService.obterNegociacoesDaSemanaRetrasada(
    //   (erro, negociacoes) => {
    //     if (erro) {
    //       this._mensagem.texto = erro;
    //       return;
    //     }

    //     negociacoes.forEach((negociacao) => {
    //       this._listaNegociacoes.adiciona(negociacao);
    //     });
    //     this._mensagem.texto = 'Negociações importadas com sucesso';
    //   }
    // );
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações deletadas com sucesso';
    // this._mensagemView.update(this._mensagem);
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  _limpaForm() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}
