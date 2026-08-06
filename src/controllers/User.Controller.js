import { TableUser } from "../models/User-model.js";

const MESSAGES = {
    200: "La operación se realizó correctamente.",
    201: "El recurso fue creado exitosamente.",
    400: "Solicitud inválida. Verificá que todos los campos estén completos y sean correctos.",
    404: "El recurso solicitado no fue encontrado.",
    500: "Ocurrió un error interno en el servidor. Intentá de nuevo más tarde."
}


// esto debe ir con post
export const crearUser = async (req,res)=>{
    try {
        const {name, email, password}  = req.body;

        if(!name || !email || !password ){
            return res.status(400).json(MESSAGES[400])
        }

        if(name.length > 100 || email.length > 100 || password.length > 100){
            return res.status(400).json(MESSAGES[400])
        }

        const coincidencias = await TableUser.findOne({
            where: { email }
        })

        if(coincidencias) {
            return res.status(400).json( {messages: `el correo electronico ingresado "YA EXISTE"`})
        }

        const userNuevo = await TableUser.create({
            name,
            email,
            password
        })

        return res.status(201).json(MESSAGES[201])
    } catch (error) {
        res.status(500).json(MESSAGES[500])
    }
}