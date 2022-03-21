const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const motoSchema = new mongoose.Schema({
  patente: {
    type: String,
    trim: true,
    required: "Debe indicar la patente de la moto",
    maxlength: 8,
    minlength: 8,
    text: true,
    match: [/[A-Z]{2}0[0-9]{3}-[0-9-kK]/, "Ingresar patente válida"],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
  estado: {
    type: String,
    default: "Disponible",
    enum: ["Disponible", "Reservada", "Arrendada", "Mantención"],
    index: true,
  },
  categoria: {
    required: "Debe indicar una categoría",
    type: ObjectId,
    ref: "categoria",
  },
});

module.exports = mongoose.model("Moto", motoSchema);
