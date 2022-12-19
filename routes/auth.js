
const { Router} = require("express");
const { check} = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const { registerUsuario, loginUsuario } = require("../controllers/authController");


const authRouter = Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *    Usuario:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: Este es el nombre de Usuario    
 *        email:
 *          type: string
 *          description: Este es el correo 
 *        password:
 *          type: string
 *          description: Esta es la contraseña, necesita minimo ser de 6 caracteres
 *      required:
 *        - username 
 *        - email
 *        - password
 *      example:
 *        username: JLBG
 *        email: jlbg@mail.com
 *        password: password123          
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: Registra un nuevo usuario
 *      tags: [Usuario]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Usuario'
 *      responses:
 *          501:
 *              description: Correo ya registrado
 *          200:
 *              description: Usuario credo correctamente y retornado con JWT (token)
 *                    
 */


authRouter.post("/register", [check("email","Formato invalido").isEmail(),
check("password", "La contraseña tiene que tener 6 caracteres como minimo").isLength({min:6}),
check("usermane", "El nombre de usuario es requerido").not().isEmpty(),
validationErrors], 
registerUsuario);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Inicio de sesion de un nuevo usuario con un Token valido
 *      tags: [Usuario]
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Este es el correo 
 *                          password:
 *                              type: string
 *                              description: Esta es la contraseña, necesita minimo ser de 6 cara
 *                      required:
 *                          - username 
 *                          - email
 *                          - password
 *                      example:
 *                          username: JLBG
 *                          email: jlbg@mail.com
 *                          password: password123
 *      responses:
 *          401:
 *              description: Usuario o contraseña invalida
 *          200:
 *              description: Usuario logueado correctamente y retornado un JWT (token)
 *                    
 */


authRouter.post("/login", [check("email","Formato invalido").isEmail(),
check("password", "La contraseña tiene que tener 6 caracteres como minimo").isLength({min:6}),
validationErrors],
loginUsuario);


module.exports = authRouter