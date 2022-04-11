const mongoose = require("mongoose");
const Moto = require("../models/moto");
const Categoria = require("../models/categoria");
const slugify = require("slugify");

exports.crearMoto = async (req, res) => 
{
  try
  {
      console.log(req.body);
      req.body.slug = slugify(req.body.patente);
      const nuevaMoto = await new Moto(req.body).save();
      res.status(200).json(nuevaMoto);
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

exports.detalleMoto = async (req, res) => 
{
    const moto = await Moto.findOne({slug: req.params.slug}).exec();
    const idCat = mongoose.Types.ObjectId(moto.categoria);
    const categoria = await Categoria.findOne({_id: idCat}).exec();
    
    if(moto) res.status(200).json({moto, categoria}); //devuelve la moto y la categoría la que corresponde.
    else return res.status(204).send("Moto no ha sido encontrada");
};

exports.borradoSoftMoto = async (req, res) => 
{
  try 
  {
    //console.log(req.params.slug);
    const deleted = await Moto.findOneAndUpdate(
      { slug: req.params.slug},
      { estado: "Eliminada" },
      { new: true }).exec();
    res.json(deleted);
  } 
  catch (err) 
  {
      console.log("Falló eliminación de moto: ", err);
      return res.status(400).send("Falló eliminación de moto");
  }
};

exports.eliminaMoto = async (req, res) => 
{
  try 
  {
    const deleted = await Moto.findOneAndRemove({slug: req.params.slug }).exec();
    if(!deleted) return res.status(400).send("Moto no encontrada.");
    else res.status(200).json(deleted);
  } 
  catch (err) 
  {
    console.log("Error al eliminar moto: ", err);
    return res.status(400).send("Falló eliminación de moto");
  }
};

exports.actualizaMoto = async (req, res) => 
{
  try 
  {
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const updated = await Moto.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }).exec();
    res.json(updated);
  } 
  catch (err) 
  {
    console.log("Error al actualizar moto: ", err);
    res.status(400).json({ err: err.message });
  }
};
  
exports.cuentaMotos = async (req, res) => 
{
  try 
  {
    const {estado} = req.body;
    const totalMotos = await Moto.countDocuments(estado?{estado}:null);
    //console.log(totalMotos);
    res.status(200).json(totalMotos);
  }
  catch (err)
  {
    res.status(400).json(0);
  }
}

exports.listaPagMoto = async (req, res) => 
{
  try 
  {
    let { sort, order, page, estado, cant} = req.body;
    sort = sort || 'patente';
    order = order || 'asc';
    //estado = estado || 'Disponible';
    //console.log(`valor estado ${estado}`);
    const currentPage = page || 1;
    const perPage = cant || 5;
    //cuenta la cantidad de motos por estado
    const totalMotos = await Moto.countDocuments(estado?{estado}:null);
    //console.log(`total motos: ${totalMotos}`);
    const saltar = (currentPage - 1) * perPage;
    const motos = await Moto.find(estado?{estado}:null)
      .skip(saltar)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
      if(motos.length===0 && currentPage===1)
          return res.status(200).send("No han sido encontrado registros que coincidan con el filtro.");
      else 
        if(currentPage>(totalMotos/perPage)+1)
            return res.status(200).send("En esta página no hay más registros por listar.");
        else
            res.status(200).json(motos);
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
