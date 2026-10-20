const tarifas = require("./tarifas");

function calcularPresupuesto(datos) {
  const base = tarifas[datos.tipo];
  const paginasAdicionales = (datos.paginas - 1) * tarifas.paginaAdicional;

  const costeFormulario = datos.formulario ? tarifas.formulario : 0;
  const costeSegundoIdioma = datos.segundoIdioma ? tarifas.segundoIdioma : 0;

  const total =
    base + paginasAdicionales + costeFormulario + costeSegundoIdioma;

  return {
    base,
    paginasAdicionales,
    formulario: costeFormulario,
    segundoIdioma: costeSegundoIdioma,
    total,
    moneda: tarifas.moneda
  };
}

module.exports = calcularPresupuesto;