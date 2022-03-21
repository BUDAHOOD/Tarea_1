const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const detalleMantencionSchema = new mongoose.Schema(
  {
    patenteMoto: {
      type: ObjectId,
      ref: "Moto",
      required: "Debe indicar patente de moto",
    },
    fechaMantencion: {
      type: Date,
      required: "Debe indicar fecha de mantención",
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mantencion", mantencionSchema);
