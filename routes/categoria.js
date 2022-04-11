const express = require("express");
const router = express.Router();

const {crearCategoria, listarCategoria, actualizaCategoria, eliminaCategoria} = require("../controllers/categoria");

router.post("/agregarCategoria", crearCategoria);
router.get("/listadoCategorias", listarCategoria);
router.put("/actualizaCategoria/:slug", actualizaCategoria);
router.delete("/eliminaCategoria/:slug", eliminaCategoria);

module.exports = router;
