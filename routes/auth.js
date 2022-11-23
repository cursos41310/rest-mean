
const { Router} = require("express");
const { check} = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const { registerUsuario, loginUsuario } = require("../controllers/authController");


const authRouter = Router();

authRouter.post("/register", [check("email","Formato invalido").isEmail(),
check("password", "La contraseña tiene que tener 6 caracteres como minimo").isLength({min:6}),
check("usermane", "El nombre de usuario es requerido").not().isEmpty(),
validationErrors], 
registerUsuario);
authRouter.post("/login", [check("email","Formato invalido").isEmail(),
check("password", "La contraseña tiene que tener 6 caracteres como minimo").isLength({min:6}),
validationErrors],
loginUsuario);


module.exports = authRouter