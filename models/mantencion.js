const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const mantencionSchema = new mongoose.Schema({
  patenteMoto: {
    required: "Debe indicar patente de moto",
    type: ObjectId,
    ref: "Moto",
  },
  fechaMantencion: {
    type: Date,
    required: "Debe indicar fecha de mantención",
  },
  origenMantencion: {
    type: ObjectId,
    ref: "Arriendo",
  },
  detalle: [
    {
      descripcion: {
        type: String,
      },
      precio: {
        type: Number,
      },
    },
  ],
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
});

module.exports = mongoose.model("Mantencion", mantencionSchema);
