const express = require("express");
const router = express.Router();

const {listar, crear} = require("../controllers/moto");

router.post("/agregarMoto", crear);
router.get("/listadomotos", listar);

module.exports = router;