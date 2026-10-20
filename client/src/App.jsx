import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3001/api'

const formInicial = {
  tipo: 'landing',
  paginas: '1',
  formulario: false,
  segundoIdioma: false
}

const formatEuro = (value) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(value) || 0)

const etiquetasTarifas = {
  landing: 'Landing',
  corporativa: 'Web corporativa',
  paginaAdicional: 'Página adicional',
  formulario: 'Formulario de contacto',
  segundoIdioma: 'Segundo idioma',
  moneda: 'Moneda'
}

function App() {
  const [formData, setFormData] = useState(formInicial)
  const [tarifas, setTarifas] = useState(null)
  const [tarifasError, setTarifasError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [presupuesto, setPresupuesto] = useState(null)

  useEffect(() => {
    const cargarTarifas = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/tarifas`)

        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar las tarifas del servidor.')
        }

        const datos = await respuesta.json()

        if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
          throw new Error('La respuesta de tarifas no es válida.')
        }

        setTarifas(datos)
      } catch {
        setTarifasError(
          'No se pudo cargar la información de tarifas. Puedes seguir usando el formulario.'
        )
      }
    }

    cargarTarifas()
  }, [])

  const manejarCambio = (event) => {
    const { name, value, type, checked } = event.target

    setPresupuesto(null)
    setError('')

    setFormData((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const manejarSubmit = async (event) => {
    event.preventDefault()

    if (isLoading) {
      return
    }

    if (formData.paginas === '' || formData.paginas === null) {
      setPresupuesto(null)
      setError('Debes introducir el número de páginas.')
      return
    }

    const paginas = Number(formData.paginas)

    if (!Number.isInteger(paginas) || paginas < 1 || paginas > 20) {
      setPresupuesto(null)
      setError('El número de páginas debe ser un entero entre 1 y 20.')
      return
    }

    setError('')
    setPresupuesto(null)
    setIsLoading(true)

    try {
      const payload = {
        tipo: formData.tipo,
        paginas,
        formulario: Boolean(formData.formulario),
        segundoIdioma: Boolean(formData.segundoIdioma)
      }

      const respuesta = await fetch(`${API_URL}/presupuesto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const texto = await respuesta.text()
      let datos = null

      if (texto) {
        try {
          datos = JSON.parse(texto)
        } catch {
          datos = null
        }
      }

      if (!respuesta.ok) {
        const mensaje =
          datos && typeof datos.error === 'string' && datos.error.trim()
            ? datos.error
            : 'No se pudo procesar la solicitud.'

        if (respuesta.status === 400) {
          setError(mensaje)
        } else if (respuesta.status === 500) {
          setError('Ha ocurrido un error interno del servidor.')
        } else {
          setError(mensaje)
        }

        return
      }

      if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
        setError('Respuesta no válida del servicio.')
        return
      }

      setPresupuesto(datos)
    } catch {
      setError('No se puede conectar con el servidor. Comprueba que la API está iniciada.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div className="brand-mark">Web Studio</div>
        <p className="eyebrow">Desarrollo web en entorno servidor</p>
        <h1>Presupuesta mi web</h1>
        <p className="subtitle">
          Calcula un presupuesto rápido para tu sitio web y revisa el desglose detallado.
        </p>
      </header>

      <main className="main-layout">
        <section className="panel panel-formulario">
          <div className="panel-header">
            <span className="panel-kicker">Dashboard</span>
            <h2>Solicita tu presupuesto</h2>
          </div>

          <form className="presupuesto-form" onSubmit={manejarSubmit} noValidate>
            <div className="field">
              <label htmlFor="tipo">Tipo de web</label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={manejarCambio}
              >
                <option value="landing">Landing</option>
                <option value="corporativa">Web corporativa</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="paginas">Número de páginas</label>
              <input
                id="paginas"
                name="paginas"
                type="number"
                min="1"
                max="20"
                step="1"
                value={formData.paginas}
                onChange={manejarCambio}
                required
              />
              <small>La primera página ya está incluida en el precio base.</small>
            </div>

            <fieldset className="extras">
              <legend>Extras</legend>

              <label className="checkbox-row" htmlFor="formulario">
                <input
                  id="formulario"
                  name="formulario"
                  type="checkbox"
                  checked={formData.formulario}
                  onChange={manejarCambio}
                />
                <span>Formulario de contacto</span>
              </label>

              <label className="checkbox-row" htmlFor="segundoIdioma">
                <input
                  id="segundoIdioma"
                  name="segundoIdioma"
                  type="checkbox"
                  checked={formData.segundoIdioma}
                  onChange={manejarCambio}
                />
                <span>Segundo idioma</span>
              </label>
            </fieldset>

            <button type="submit" className="primary-button" disabled={isLoading}>
              {isLoading ? 'Calculando…' : 'Calcular presupuesto'}
            </button>
          </form>
        </section>

        <section className="panel resultado-panel" aria-live="polite">
          <div className="panel-header">
            <span className="panel-kicker">Resumen</span>
            <h2>Desglose</h2>
          </div>

          {tarifas && (
            <div className="tarifas-box">
              <h3>Tarifas del servidor</h3>
              <ul>
                {Object.entries(tarifas).map(([clave, valor]) => {
                  if (clave === 'moneda') {
                    return (
                      <li key={clave}>
                        <span>{etiquetasTarifas[clave] || clave}</span>
                        <strong>{valor}</strong>
                      </li>
                    )
                  }

                  return (
                    <li key={clave}>
                      <span>{etiquetasTarifas[clave] || clave}</span>
                      <strong>{formatEuro(valor)}</strong>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {tarifasError && <p className="info-message">{tarifasError}</p>}

          {!presupuesto && !isLoading && !error && (
            <p className="empty-state">
              Introduce los datos y pulsa el botón para solicitar un presupuesto.
            </p>
          )}

          {error && (
            <div className="alert error" role="alert">
              {error}
            </div>
          )}

          {presupuesto && (
            <div className="presupuesto-box">
              <div className="linea">
                <span>Precio base</span>
                <strong>{formatEuro(presupuesto.base)}</strong>
              </div>
              <div className="linea">
                <span>Páginas adicionales</span>
                <strong>{formatEuro(presupuesto.paginasAdicionales)}</strong>
              </div>
              <div className="linea">
                <span>Formulario de contacto</span>
                <strong>{formatEuro(presupuesto.formulario)}</strong>
              </div>
              <div className="linea">
                <span>Segundo idioma</span>
                <strong>{formatEuro(presupuesto.segundoIdioma)}</strong>
              </div>

              <div className="total-box">
                <span>Total</span>
                <strong>{formatEuro(presupuesto.total)}</strong>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="page-footer">
        <span>Samuel Martínez</span>
      </footer>
    </div>
  )
}

export default App
