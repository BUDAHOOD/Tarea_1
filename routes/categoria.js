const express = require("express");
const router = express.Router();

const {listar, crear} = require("../controllers/categoria");

router.post("/agregarCategoria", crear);
router.get("/listadoCategorias", listar);

module.exports = router;