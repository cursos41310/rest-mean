
const mongoose = require("mongoose");
const conexionDB = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION);    

        console.log("conectado");
    } catch (error) {
        console.log("Error de conexion");
    }
    
}

module.exports = conexionDB;