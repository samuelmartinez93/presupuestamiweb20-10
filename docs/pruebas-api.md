# Evidencias de pruebas de la API

Herramienta utilizada: REST Client en Visual Studio Code.
URL base: http://localhost:3001

## Prueba 1: estado del servicio

Petición: GET /api/estado.

Resultado esperado: HTTP 200 y {"status":"ok"}.

Resultado obtenido: HTTP 200 y {"status":"ok"}.

Comparación: coincide con lo esperado.

Captura: capturas/01-estado.jpg.

## Prueba 2: tarifas

Petición: GET /api/tarifas.

Resultado esperado: HTTP 200 y las tarifas utilizadas por el servidor.

Resultado obtenido: HTTP 200 y las tarifas correctas.

Comparación: coincide con lo esperado.

Captura: capturas/02-tarifas.jpg.