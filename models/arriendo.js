const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const arriendoSchema = new mongoose.Schema({
  rutCliente: {
    type: ObjectId,
    ref: "Cliente",
    required: "Debe indicar rut de cliente",
  },
  patenteMoto: {
    type: ObjectId,
    ref: "Moto",
    required: "Debe indicar patente de moto",
  },
  fechaInicio: {
    type: Date,
    required: "Debe indicar fecha de inicio del arriendo",
  },
  fechaEstimadaFin: {
    type: Date,
    required: "Debe indicar una fecha estimada de término del arriendo",
  },
  fechaFin: {
    type: Date,
  },
  estado: {
    type: String,
    default: "Reserva",
    enum: ["Reserva", "Activo", "Extendido", "Finalizado"],
    /*
            Reserva     --> Un cliente reserva una moto, la cual no queda disponible en las fechas de inicio y estimada fin
            Activo      --> El arriendo se hace efectivo
            Extendido   --> La fecha estimada fin ha sido sobrepasado y la devolución no ha sido realizada
            Finalizado  --> La devolución ha sido realizada
             */
    index: true,
  },
  valorReserva: {
    type: Number,
  },
  valorArriendo: {
    type: Number,
  },
  valorExtendido: {
    type: Number,
  },
  valorFinalArriendo: {
    type: Number,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
  },
});

module.exports = mongoose.model("Arriendo", arriendoSchema);
