const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: "Debe indicar el nombre de la categoría",
    },
    descripcion: {
      type: String,
      trim: true,
      required: "Indicar una breve descripción de la Categoría",
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

module.exports = mongoose.model("Categoria", categoriaSchema);
