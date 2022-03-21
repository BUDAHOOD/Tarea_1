const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema(
    {
        rut: {
            type: String,
            trim: true,
            required: "Debe indicar RUT",
            index: true,
            unique: true,
            maxlength: 10,
            minlength: 10,
            match: [/[0-9]{8}-[0-9-kK]/, "Ingresar formato válido (ej.:xxxxxxxx-k)"]
        },
        nombre: {
            type: String,
            trim: true,
            required: "Debe indicar el nombre del cliente"
        },
        apellidoPat: {
            type: String,
            trim: true,
            required: "Debe indicar el apellido paterno"
        },
        apellidoMat: {
            type: String,
            trim: true,
        },
        telefono: {
            type: String,
            trim: true,
            match: [/+56[7-9]{1}[0-9]{8}/, "Ingresar formato válido (ej.:+569xxxxxxxx)"]
        },
        direccion: {
            type: String,
            trim: true,
            required: "Debe indicar la dirección",
        },
        mail: {
            type: String,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Cliente", clienteSchema);