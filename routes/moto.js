const express = require("express");
const router = express.Router();

const {crearMoto, detalleMoto, borradoSoftMoto, eliminaMoto, actualizaMoto, cuentaMotos, listaPagMoto} = require("../controllers/moto");

router.post("/agregarMoto", crearMoto);
router.get("/detalleMoto/:slug", detalleMoto);
router.patch("/moto/:slug", borradoSoftMoto);
router.delete("/moto/:slug", eliminaMoto);
router.put("/moto/:slug", actualizaMoto);
router.get("/listaPag", listaPagMoto);
router.get("/cuentaMotos", cuentaMotos);

module.exports = router;
