const mongoose = require("mongoose");
const connectDB = async () => {
    try
    {
        await mongoose.connect(process.env.DATABASE,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            });
            console.log("Base de Datos conectada");
    }
    catch(err)
    {
        console.log("Error al conectar con la base de datos ", err);
        process.exit(1);
    }
}

module.exports = connectDB;