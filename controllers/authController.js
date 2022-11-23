const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const usuarioModel = require('../models/usuario');
const {validationResult} = require("express-validator");



const registerUsuario = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        let usuario = await usuarioModel.findOne({email});
        if (usuario) {
            return res.status(501).json({
                ok: false,
                msg: "correo ya registrado"
            });
        }    

        const nuevousuario = new usuarioModel({email, password, username});
        
        const salt = bcryptjs.genSaltSync(12);

        nuevousuario.password = bcryptjs.hashSync(password, salt);

        
        await nuevousuario.save();

        const payload = {
            id: nuevousuario.id
        }

        
        jwt.sign(payload, process.env.SECRETA, {expiresIn: 3600}, (error, token) => {

            res.json({
                ok: true,
                id: nuevousuario.id,
                username,
                msg: "Usuario nuevo creado",
                token,
            });
    
        });

        
    } catch (error) {
        res.json({
            ok:false,
            msg: "error al registrar"
        })
    }
    

    
   // res.json({ok: true, email, password, username});
}


const loginUsuario = async (req, res) => {
 const {email, password} = req.body;

    try {
        let usuario = await usuarioModel.findOne({email});
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "correo o contraseña invalida"
            });
        }    
     
        const passwordvalido = bcryptjs.compareSync(password, usuario.password);
        if (!passwordvalido) {
            return res.status(401).json({
                ok: false,
                msg: "correo o contraseña invalida"
            });
        }    
     
        const payload = {
            id: usuario.id
        }
        
        jwt.sign(payload, process.env.SECRETA, {expiresIn: 3600}, (error, token) => {
           return res.json({
                ok: true,
                id: usuario.id,
                username: usuario.username,
                msg: "Usuario logueado",
                token,
            });
    
        });
 } catch (error) {
    res.json({
        ok:false,
        msg: "error en login"
    })
 }


  //  res.send('Auth controller');
}

module.exports = {
   loginUsuario,
   registerUsuario
};