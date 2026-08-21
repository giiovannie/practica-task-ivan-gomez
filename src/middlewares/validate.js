//segundo paso aca o el primero
//este es el validador general para los demas validadores ligados a los modelos
import { validationResult } from "express-validator";

//nota : validationResult(req) es sincrono
export const validate = async ()=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return results.status(400).json(errors)
    }

    next()
}

