const middleWares = (req, res, next) => {
    const parametro = req.query;
    
    if (Object.keys(parametro).length == 0) {
      res.json({ message: "No se ha generado ningun parametro" });
    } else {
      next();
    }
  };
  
module.exports = { middleWares };