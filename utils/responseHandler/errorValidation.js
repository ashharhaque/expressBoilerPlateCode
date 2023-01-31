const { validationResult } = require('express-validator/check');

exports.validationResult=(req,res,next)=>{

    let errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(500).json({
        status:422,
        message:errorValidation.array()[0].msg,
        data:{

        }
      });
    }
    next();

}