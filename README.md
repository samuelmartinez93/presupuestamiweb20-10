# Presupuesta mi web
Alumno: Samuel Martínez
Profesor: Javier Ferrer

Actividad del módulo 0613 — Desarrollo web en entorno servidor.

Aplicación para calcular presupuestos de páginas web mediante una API
desarrollada con Node.js, Express y JavaScript. Incluye una interfaz
cliente realizada con React.

El cliente selecciona las características de la web y envía una solicitud
JSON al servidor. El servidor valida los datos, aplica sus propias
tarifas y devuelve un presupuesto desglosado.

Los presupuestos no se guardan en una base de datos.

Esquema proyecto:
presupuesto-web/
├── client/                 Interfaz React y configuración de Vite.
├── server/
│   ├── src/
│   │   ├── server.js       Servidor y rutas de la API.
│   │   ├── tarifas.js      Tarifas definidas en el servidor.
│   │   ├── validar.js      Validación de las solicitudes.
│   │   └── calcular.js     Función de cálculo independiente.
│   ├── package.json
│   └── package-lock.json
├── docs/                   Informe y capturas de las pruebas.
│   └── pruebas-api.md
├── pruebas-api.http        Peticiones para REST Client.
├── .gitignore
└── README.md

## 0. Inicio rápido para instalar y abrir el proyecto

Sigue estos pasos desde cero para que el profesor pueda poner en marcha la
aplicación sin tener que descargar manualmente todos los paquetes del proyecto:

¡Recuerda! --> Abre la carpeta raíz del proyecto en Visual Studio Code: la que contiene client,server y este readme.

Todos los comandos siguientes parten de esa carpeta.
El backend y el frontend se ejecutan en dos terminales diferentes.

### 1) Instalar Node.js y npm

Descarga e instala Node.js desde la página oficial:

https://nodejs.org/

Comprueba que quedan disponibles ejecutando:

```bash
node -v
npm -v
```

### 2) Instalar dependencias del backend

En la carpeta del proyecto, entra en la carpeta del servidor:

```bash
cd presupuesto-web/server
npm install
```

### 3) Instalar dependencias del frontend

Abre otra terminal y entra en la carpeta cliente:

```bash
cd presupuesto-web/client
npm install
```

### 4) Arrancar el backend

En la terminal del servidor:

```bash
npm start
```

La API quedará disponible en:

```text
http://localhost:3001
```

### 5) Arrancar el frontend

En la terminal del cliente:

```bash
npm run dev
```

La interfaz quedará disponible en:

```text
http://localhost:5173
```

> Enlace para revisarlo desde el navegador: http://localhost:5173

### 6) Verificar funcionamiento

1. Comprueba que el backend responde en http://localhost:3001/api/estado.
2. Abre el frontend en http://localhost:5173.
3. Rellena el formulario y pulsa “Calcular presupuesto”.

---

## 1. Tecnologías

- Node.js.
- Express.
- JavaScript.
- React.
- Vite.
- CORS.
- REST Client de Visual Studio Code para realizar las pruebas.

## 2. Organización del proyecto

```text
presupuesto-web/
├── client/                 Interfaz React.
├── server/
│   ├── src/
│   │   ├── server.js       Servidor y rutas de la API.
│   │   ├── tarifas.js      Tarifas definidas en el servidor.
│   │   ├── validar.js      Validación de las solicitudes.
│   │   └── calcular.js     Función de cálculo independiente.
│   ├── package.json
│   └── package-lock.json
├── pruebas-api.http        Peticiones reproducibles para REST Client.
├── .gitignore
└── README.md
```

## 3. Requisitos

- Node.js y npm instalados.
- Una terminal.
- Un navegador para utilizar la interfaz.
- Opcionalmente, Visual Studio Code con REST Client para repetir
  las peticiones del archivo pruebas-api.http.

## 4. Instalación y ejecución del backend

Abre una terminal en la carpeta raíz del proyecto, presupuesto-web.

Ejecuta:

```bash
cd server
npm install
npm start
```

La API utiliza por defecto el puerto 3001:

```text
http://localhost:3001
```

Mantén esta terminal abierta mientras utilizas o pruebas la aplicación.

Si se ha configurado la variable de entorno PORT, el servidor utilizará
el puerto indicado en ella. La interfaz está preparada para llamar al
puerto 3001, por lo que ambos deben coincidir.

## 5. Instalación y ejecución del frontend

Abre una segunda terminal en la carpeta raíz del proyecto,
presupuesto-web.

Ejecuta:

```bash
cd client
npm install
npm run dev
```

Abre en el navegador la dirección que indique Vite, normalmente:

```text
http://localhost:5173
```

El backend y el frontend deben permanecer encendidos para utilizar
el formulario completo.

## 6. Funcionamiento

1. El usuario selecciona el tipo de web.
2. Indica el número de páginas.
3. Selecciona si necesita formulario de contacto.
4. Selecciona si necesita un segundo idioma.
5. La interfaz envía una petición POST con JSON a la API.
6. El servidor valida los datos.
7. Si los datos son válidos, calcula el presupuesto.
8. La interfaz muestra el desglose devuelto por el servidor.

Las tarifas y el cálculo se mantienen en el servidor.
El cliente no decide el precio ni el total.

## 7. Tarifas

| Concepto | Precio |
|---|---:|
| Landing, incluida la primera página | 300 EUR |
| Web corporativa, incluida la primera página | 600 EUR |
| Cada página adicional a la primera | 50 EUR |
| Formulario de contacto | 80 EUR |
| Segundo idioma | 150 EUR |

No se aplican impuestos, descuentos ni otros conceptos.

## 8. Rutas de la API

### GET /api/estado

Comprueba que el servicio está funcionando.

URL:

```text
http://localhost:3001/api/estado
```

Respuesta correcta: HTTP 200.

```json
{
  "status": "ok"
}
```

### GET /api/tarifas

Devuelve las tarifas utilizadas por el servidor.

URL:

```text
http://localhost:3001/api/tarifas
```

Respuesta correcta: HTTP 200.

```json
{
  "landing": 300,
  "corporativa": 600,
  "paginaAdicional": 50,
  "formulario": 80,
  "segundoIdioma": 150,
  "moneda": "EUR"
}
```

### POST /api/presupuesto

Recibe las características de la web y devuelve el presupuesto calculado.

URL:

```text
http://localhost:3001/api/presupuesto
```

Cabecera:

```http
Content-Type: application/json
```

Los cuatro campos son obligatorios.

Ejemplo de solicitud:

```json
{
  "tipo": "corporativa",
  "paginas": 4,
  "formulario": true,
  "segundoIdioma": false
}
```

Respuesta correcta: HTTP 200.

```json
{
  "base": 600,
  "paginasAdicionales": 150,
  "formulario": 80,
  "segundoIdioma": 0,
  "total": 830,
  "moneda": "EUR"
}
```

El campo paginasAdicionales representa el coste de las páginas
adicionales, no su cantidad.

## 9. Validación

Antes de calcular, el servidor comprueba que:

- El cuerpo sea un objeto, no null ni un array.
- Existan tipo, paginas, formulario y segundoIdioma.
- tipo sea exactamente "landing" o "corporativa".
- paginas sea un número entero entre 1 y 20.
- formulario sea un booleano.
- segundoIdioma sea un booleano.

No se convierten automáticamente los tipos recibidos por la API:

- 4 es un número válido.
- "4" es una cadena y debe rechazarse.
- false es un booleano válido.
- "false" es una cadena y debe rechazarse.

Las propiedades adicionales se ignoran y no deben modificar las tarifas
ni imponer un total.

Cuando la validación falla, se devuelve HTTP 400 con un mensaje
comprensible y no se calcula el presupuesto.

Ejemplo observado:

```json
{
  "error": "El campo \"paginas\" debe ser un número entero entre 1 y 20."
}
```

## 10. Separación de responsabilidades

- server.js recibe las peticiones y gestiona las respuestas HTTP.
- validar.js comprueba los datos de entrada.
- tarifas.js contiene los precios del servidor.
- calcular.js aplica las reglas del presupuesto a datos ya validados.
- La interfaz React recoge las opciones y presenta el resultado.

La función calcularPresupuesto está separada del manejador HTTP.

## 11. Regla de cálculo

```text
Coste de páginas adicionales = (paginas - 1) × 50

Total = base + coste de páginas adicionales
        + coste de formulario + coste de segundo idioma
```

Ejemplo: corporativa con 4 páginas y formulario de contacto.

```text
Base corporativa:                   600 EUR
3 páginas adicionales × 50 EUR:      150 EUR
Formulario de contacto:               80 EUR
Segundo idioma no seleccionado:       0 EUR
Total:                              830 EUR
```

La primera página está incluida en la tarifa base.

## 12. Estados HTTP

| Estado | Significado |
|---|---|
| 200 | Operación realizada correctamente. |
| 400 | Solicitud con datos que incumplen el contrato. |
| 500 | Fallo interno inesperado del servidor. |

Las capturas realizadas hasta el momento muestran respuestas 200 y 400.

La prueba específica del estado 500 está pendiente de documentar.
No se considera verificada únicamente por disponer de un bloque try/catch.

## 13. Cómo reproducir las pruebas

1. Iniciar el backend.
2. Instalar REST Client en Visual Studio Code.
3. Abrir pruebas-api.http.
4. Pulsar Send Request sobre la petición correspondiente.
5. Comprobar el estado HTTP y el cuerpo de la respuesta.

Las peticiones POST incluyen Content-Type: application/json.

Abrir una URL en la barra del navegador no sustituye el envío de un
POST con cuerpo JSON.

El informe detallado y las evidencias de las pruebas se encuentran en
[docs/pruebas-api.md](docs/pruebas-api.md).

Las capturas están guardadas dentro de la carpeta `docs`.

## 14. Pruebas de las rutas GET

| Ruta | Resultado esperado | Resultado obtenido |
|---|---|---|
| GET /api/estado | 200 y {"status":"ok"} | 200 y {"status":"ok"} |
| GET /api/tarifas | 200 y tarifas del servidor | 200 y tarifas correctas |

## 15. Casos de prueba del presupuesto

En todos los casos se utiliza:

```http
POST http://localhost:3001/api/presupuesto
Content-Type: application/json
```

| Caso del enunciado | Solicitud JSON enviada | Resultado esperado | Resultado obtenido |
|---|---|---|---|
| 1 | `{"tipo":"landing","paginas":1,"formulario":false,"segundoIdioma":false}` | 200, total 300 EUR | 200, total 300 EUR |
| 2 | `{"tipo":"corporativa","paginas":4,"formulario":true,"segundoIdioma":false}` | 200, total 830 EUR | 200, total 830 EUR |
| 3 | `{"tipo":"landing","paginas":2,"formulario":true,"segundoIdioma":true}` | 200, total 580 EUR | 200, total 580 EUR |
| 4 | `{"tipo":"landing","paginas":20,"formulario":false,"segundoIdioma":false}` | 200, total 1250 EUR | 200, total 1250 EUR |
| 5 | `{"tipo":"landing","paginas":0,"formulario":false,"segundoIdioma":false}` | 400 | 400, error sobre paginas |
| 6 | `{"tipo":"landing","paginas":21,"formulario":false,"segundoIdioma":false}` | 400 | 400, error sobre paginas |
| 7 | `{"tipo":"landing","paginas":2.5,"formulario":false,"segundoIdioma":false}` | 400 | 400, error sobre paginas |
| 8 | `{"tipo":"tienda","paginas":3,"formulario":false,"segundoIdioma":false}` | 400 | 400, error sobre tipo |
| 9 | `{"tipo":"landing","paginas":3,"formulario":"false","segundoIdioma":false}` | 400 | 400, error sobre formulario |

Los casos 1 a 9 del enunciado corresponden a las peticiones 3 a 11
del archivo pruebas-api.http, porque sus dos primeras peticiones
comprueban las rutas GET.

## 16. Interpretación de los resultados

Los cuatro presupuestos válidos devolvieron los totales esperados.

Las entradas inválidas devolvieron HTTP 400 y mensajes relacionados
con el campo incorrecto, sin devolver un desglose de presupuesto.

Un HTTP 400 en una prueba diseñada para enviar datos inválidos es
un resultado correcto de la validación, no un fallo de la aplicación.

## 17. Dependencias y entrega

Se incluyen en el repositorio:

- Código fuente.
- package.json de server y client.
- package-lock.json de server y client.
- Configuración de Vite y demás archivos necesarios.
- pruebas-api.http.
- README.md.
- Documentación y capturas de pruebas.

No se incluyen:

- node_modules.
- Credenciales.
- Archivos .env con datos privados.
- Archivos de compilación generados que no sean necesarios.

Las dependencias se reconstruyen ejecutando npm install
dentro de server y de client.