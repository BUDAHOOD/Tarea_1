const Categoria = require("../models/categoria");
const slugify = require("slugify");

exports.crear = async (req, res) => {
    try{
        console.log(req.body);
        req.body.slug = slugify(req.body.nombre);
        const nuevaCategoria = await new Categoria(req.body).save();
        res.status(200).json(nuevaCategoria);
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
        let listado = await Categoria.find({});
        if(listado.length>0){
            res.status(200).json(listado);
        }
        else{
            res.status(400).json(
                {
                    listado: "Sin categorías disponibles"
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

