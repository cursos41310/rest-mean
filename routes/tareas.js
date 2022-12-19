const {Router} = require("express")
const {createTarea, readTarea, updateTarea, deleteTarea} = require("../controllers/tareaController");
const verifyToken = require("../middlewares/verifyToken");
const { check } = require("express-validator");
const validationErrors = require("../middlewares/validationErrors");

const router = Router();

/**
 * @swagger
 * components: 
 *  schemas:
 *    Tarea:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Este es el nombre de la tarea    
 *        creator:
 *          type: Usuario
 *          description: Este es el id del usuario 
 *        createdAt:
 *          type: date
 *          description: Esta es la fecha de creacion
 *      required:
 *        - nombre
 *        - creator
 *        - createdAt
 *      example:
 *        nombre: Aplicacion con Laravel
 *        creator: 62ff2c17c8f68597ccccf976          
 */


/**
 * @swagger
 * /task/read:
 *  get:
 *      summary: Lee todas las tareas
 *      tags: [Tarea]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token valido
 *            required: true
 *            type: string
 *      requestBody: 
 *          required: false
 *      responses:
 *          404:
 *              description: El usuario no tiene tareas visibles
 *          200:
 *              description: Listado de tareas del Usuario logueado
 *                    
 */

 router.get("/read", [verifyToken], readTarea);

 /**
 * @swagger
 * /task/create:
 *  post:
 *      summary: Crea una nueva Tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token valido
 *            required: true
 *            type: string
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          nombre:
 *                              type: string
 *                              description: El nombre de la tarea
 *      responses:
 *          200:
 *              description: La tarea se creo correctamente
 *                    
 */

router.post("/create", [
check("nombre", "Requerido").not().isEmpty(), 
validationErrors,
verifyToken], createTarea);

 /**
 * @swagger
 * /task/update/{id}:
 *  put:
 *      summary: Actualizar una Tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la tarea por actualizar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token valido
 *            required: true
 *            type: string
 *      requestBody: 
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          nombre:
 *                              type: string
 *                              description: El nombre de la tarea
 *      responses:
 *          200:
 *              description: La tarea se actualizo correctamente
 *          404:
 *              description: La tarea se actualizo incorrectamente
 *                    
 */



router.put("/update/:id", [
    check("nombre", "Requerido").not().isEmpty(),
    validationErrors,
    verifyToken], updateTarea);

    /**
 * @swagger
 * /task/delete/{id}:
 *  delete:
 *      summary: Eliminar una Tarea
 *      tags: [Tarea]
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id de la tarea por actualizar
 *            required: true
 *            type: string
 *          - name: x-auth-token
 *            in: header
 *            description: JWT Token valido
 *            required: true
 *            type: string
 *      requestBody: 
 *          required: false
 *      responses:
 *          200:
 *              description: La tarea se elimino correctamente
 *          404:
 *              description: La tarea se elimino incorrectamente
 *                    
 */

    router.delete("/delete/:id", [verifyToken], deleteTarea);







module.exports = router;
