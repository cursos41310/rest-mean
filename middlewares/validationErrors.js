const {validationResult} = require("express-validator");


const validationErrors = (req, res, next) => {
    const errors = validationResult(res);

    if (!errors.isEmpty()){
        return res.status(501).json({
            ok: false,
            errors: errors.mapped()
        })
    } 
   
    next();
    
}

module.exports = validationErrors;


