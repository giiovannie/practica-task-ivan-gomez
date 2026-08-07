import { json } from "sequelize";
import { TableUser } from "../models/User-model.js";

const MESSAGES = {
  200: "La operación se realizó correctamente.",
  201: "El recurso fue creado exitosamente.",
  400: "Solicitud inválida. Verificá que todos los campos estén completos y sean correctos.",
  404: "El recurso solicitado no fue encontrado.",
  500: "Ocurrió un error interno en el servidor. Intentá de nuevo más tarde.",
};

// esto debe ir con /post
export const crearUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validacion para verifcar que no entre nada vacio :)
    if (!name || !email || !password) {
      return res.status(400).json(MESSAGES[400]);
    }
    // validacion para el control de caracteres maximo de 100
    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json(MESSAGES[400]);
    }
    const coincidencias = await TableUser.findOne({
      where: { email },
    });
    //validacion para verificar si existe concidencias antes de agregar algo
    if (coincidencias) {
      return res
        .status(400)
        .json({ messages: `el correo electronico ingresado "YA EXISTE"` });
    }

    const userNuevo = await TableUser.create({
      name,
      email,
      password,
    });
    return res.status(201).json(userNuevo);
  } catch (error) {
    res.status(500).json(MESSAGES[500]);
  }
};

//esto debe ir con get para obtener todo los usuarios

export const obtenerUsers = async (req, res) => {
  try {
    const users = await TableUser.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(MESSAGES[500]);
  }
};

//esto tambien va con el metodo get pero con la id en la ruta
export const obtenerUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userEncontrado = await TableUser.findOne({ where: { id } });

    if (!userEncontrado) return res.status(404).json(MESSAGES[404]);

    return res.status(201).json(userEncontrado);
  } catch (error) {
    return res.status(500).json(MESSAGES[500]);
  }
};

// nota para mi: el id que nesecitamos compara simpre viene de req que tiene guardo en la propiedad params

//esto debe ir con el metodo put

export const updateUser = async (req,res) => {
  try {
    const { id } = req.params;
    const filtroUser = await TableUser.findOne({ where: { id } });

    if (!filtroUser) return res.status(404).json(MESSAGES[404]);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(MESSAGES[400]);
    }

    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json(MESSAGES[400]);
    }

    const actualizarUser = await TableUser.update( {name,email,password}, {where: { id }})

    return res.status(200).json(actualizarUser)

  } catch (error) {
    return res.status(500).json(MESSAGES[500]);
  }
};
