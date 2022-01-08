class DateHelper {
  constructor() {
    throw new Error('DateHelper não pode ser instanciada');
  }
  static dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
  static textoParaData(texto) {
    //O ˆ indica "começando com " e o $ "terminando com".
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
      throw new Error('Deve estar no formaro aaaa-mm-dd');

    return new Date(
      ...texto.split('-').map((item, indice) => item - (indice % 2))
    );
  }
}
