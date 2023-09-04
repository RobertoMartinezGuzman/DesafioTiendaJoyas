const { Pool } = require("pg");
const format = require("pg-format");
const dotenv = require("dotenv");
dotenv.config(); 

const pool = new Pool({
    host: 'localhost',
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    allowExitOnIdle: true
})

const getJoyas = async ({ limits = 2, page = 1, order_by = "id_ASC" }) => {
  try {
    const muestra = (page - 1) * limits;
    const [campo, direccion] = order_by.split("_");
    const query = format(
      "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s", campo, direccion, limits, muestra);
    console.log("Se ha generado la consulta: ", query);
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Se ha generado el error: ", error);
  }
};

const getFiltros = async ({ precio_max, precio_min, categoria, metal,
}) => {
  try {
    const filtros = [];
    if(metal) {
      filtros.push(`metal = '${metal}'`);
    }
    if(categoria) {
      filtros.push(`categoria = '${categoria}'`)
    }
    if(precio_max) {
      filtros.push(`precio <= ${precio_max}`)
    }
    if(precio_min) {
      filtros.push(`precio >= ${precio_min}`)
    }
    let query = "SELECT * FROM inventario"
    if(filtros.length > 0) {
      query = query + ' WHERE ' + filtros.join(' AND ')
      console.log(query)
    }
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Se ha generado el error: ", error);
  }
};

module.exports = { getJoyas, getFiltros };