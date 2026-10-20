const express = require("express");
const cors = require("cors");

const tarifas = require("./tarifas");
const validarPresupuesto = require("./validar");
const calcularPresupuesto = require("./calcular");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/estado", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/tarifas", (req, res) => {
  res.status(200).json(tarifas);
});

app.post("/api/presupuesto", (req, res) => {
  try {
    const validacion = validarPresupuesto(req.body);

    if (!validacion.ok) {
      return res.status(400).json({
        error: validacion.mensaje
      });
    }

    const presupuesto = calcularPresupuesto(validacion.datos);

    return res.status(200).json(presupuesto);
  } catch (error) {
    console.error("Error interno:", error);
    return res.status(500).json({
      error: "Error interno del servidor."
    });
  }
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});