require("dotenv").config();

const express = require("express");
const conexionDB = require("./db/config");
const conexion = require("./db/config");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tareas");

const cors = require("cors");

conexionDB();

const app = express();

app.use(express.json());
app.use(cors());


app.use("/", express.static(__dirname + "/public"));
app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(process.env.PORT, ()=> {
    console.log(`APP corriendo en puerto ${process.env.PORT}`)
});

