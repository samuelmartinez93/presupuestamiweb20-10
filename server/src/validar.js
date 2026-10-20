function validarPresupuesto(body) {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return {
      ok: false,
      mensaje: "El cuerpo de la petición debe ser un objeto JSON."
    };
  }

  const camposObligatorios = [
    "tipo",
    "paginas",
    "formulario",
    "segundoIdioma"
  ];

  for (const campo of camposObligatorios) {
    if (!(campo in body)) {
      return {
        ok: false,
        mensaje: `Falta el campo obligatorio: ${campo}.`
      };
    }
  }

  if (body.tipo !== "landing" && body.tipo !== "corporativa") {
    return {
      ok: false,
      mensaje: 'El campo "tipo" debe ser "landing" o "corporativa".'
    };
  }

  if (
    typeof body.paginas !== "number" ||
    !Number.isInteger(body.paginas) ||
    body.paginas < 1 ||
    body.paginas > 20
  ) {
    return {
      ok: false,
      mensaje: 'El campo "paginas" debe ser un número entero entre 1 y 20.'
    };
  }

  if (typeof body.formulario !== "boolean") {
    return {
      ok: false,
      mensaje: 'El campo "formulario" debe ser un booleano: true o false.'
    };
  }

  if (typeof body.segundoIdioma !== "boolean") {
    return {
      ok: false,
      mensaje: 'El campo "segundoIdioma" debe ser un booleano: true o false.'
    };
  }

  return {
    ok: true,
    datos: {
      tipo: body.tipo,
      paginas: body.paginas,
      formulario: body.formulario,
      segundoIdioma: body.segundoIdioma
    }
  };
}

module.exports = validarPresupuesto;