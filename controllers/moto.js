const Moto = require("../models/moto");
const slugify = require("slugify");

exports.crear = async (req, res) => {
    try{
        console.log(req.body);
        req.body.slug = slugify(req.body.patente);
        const nuevaMoto = await new Moto(req.body).save();
        res.status(200).json(nuevaMoto);
    }
    catch (err){
        res.status(400).json({
            err: err.message,
            code: err.code
        });
    }
};

exports.listar = async (req, res) => {
    try{
        let listado = await Moto.find({});
        if(listado.length>0){
            res.status(200).json(listado);
        }
        else{
            res.status(400).json(
                {
                    listado: "Sin motos disponibles"
                }
            );
        }
    }
    catch(err)
    {
        res.status(400).json({
            err: err.message,
            code: err.code
        });
    }
};

