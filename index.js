require("dotenv").config();
const {version} = require("./package.json");

const express = require("express");
const cors = require("cors");

const conexionDB = require("./db/config");
const conexion = require("./db/config");
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tareas");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
conexionDB();

app.use(cors());
app.use(express.json());


app.use("/", express.static(__dirname + "/public"));
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MEAN Task API",
            version
        },
        servers: [
            {
                url: "http://localhost:3000"
            },
            {
                /*url: "https://mean-app-jlbg.herokuapp.com/"*/
                url: "https://cheery-beijinho-5f36bb.netlify.app/"

            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],

})));
app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(process.env.PORT, ()=> {
    console.log(`APP corriendo en puerto ${process.env.PORT}`)
});

