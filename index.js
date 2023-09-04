const express = require("express");
const app = express();
const morgan = require("morgan");
const { getJoyas, getFiltros } = require("./consultas");
const { middleWares } = require('./middlewares')

app.use(morgan("dev"));
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor encendido en el puerto 3000");
});

app.get("/joyas", middleWares, async (req, res) => {
  const parametro = req.query;
  const datos = await getJoyas(parametro);
  res.json(datos);
});

app.get("/joyas/filtros", middleWares, async (req, res) => {
  const parametro = req.query;
  const datos = await getFiltros(parametro);
  res.json(datos);
});