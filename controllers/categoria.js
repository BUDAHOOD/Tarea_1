const Categoria = require("../models/categoria");
const Moto = require("../models/moto");
const slugify = require("slugify");

exports.crearCategoria = async (req, res) => 
{
    try
    {
        console.log(req.body);
        req.body.slug = slugify(req.body.nombre);
        const nuevaCategoria = await new Categoria(req.body).save();
        res.status(200).json(nuevaCategoria);
    }
    catch (err)
    {
        res.status(400).json(
        {
            err: err.message,
            code: err.code
        });
    }
};

exports.listarCategoria = async (req, res) => 
{
    try
    {
        let listado = await Categoria.find();
        if(listado.length>0)
            res.status(200).json(listado);
        else
            return res.status(400).send("Sin categorías disponibles");
    }
    catch(err)
    {
        res.status(400).json(
        {
            err: err.message,
            code: err.code
        });
    }
};

exports.actualizaCategoria = async (req, res) => 
{
    try 
    {
        if (req.body.title) 
            req.body.slug = slugify(req.body.title);
        const updated = await Categoria.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }).exec();
        res.json(updated);
    } 
    catch (err) 
    {
        console.log("Error al actualizar categoria ", err);
        res.status(400).json(
        {
            err: err.message,
            code: err.code
        });
    }
  };

exports.eliminaCategoria = async (req, res) => 
{
    try
    {
        const categoria = await Categoria.findOne({slug: req.params.slug}).exec();
        const idCat = mongoose.Types.ObjectId(categoria._id);
        const motos = await Moto.countDocuments({Categoria: idCat}).exec();
        if(motos>0) return res.status(400).send("La Categoría no puede ser eliminada, existe al menos una moto asociada.");
        
        const deleted = await Categoria.findOneAndRemove({slug: req.params.slug }).exec();
        if(!deleted) return res.status(400).send("Categoría no encontrada.");
        else res.status(200).json(deleted);
    } 
    catch (err) 
    {
        console.log("Error al eliminar Categoria: ", err);
        return res.status(400).send("Falló eliminación de Categoria");
    }
};
