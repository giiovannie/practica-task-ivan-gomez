import { UserModel } from "../models/User.js";
import { TaskModel } from "../models/Task.js"; // nota para mi : a pesar de que ya relacione los modelos debo igual importar los modelos aca al tarer referencias con los endpoints
import { CategoryModel } from "../models/Category.js";
import { DireccionModel } from "../models/Direccion.js"

export const MESSAGES = {
  200: "La operación se realizó correctamente.",
  201: "El recurso fue creado exitosamente.",
  400: "Solicitud inválida. Verificá que todos los campos estén completos y sean correctos.",
  404: "El recurso solicitado no fue encontrado.",
  500: "Ocurrió un error interno en el servidor. Intentá de nuevo más tarde.",
};

// esto debe ir con /post
export const crearUser = async (req, res) => {
  try {
      const data = matchedData(req);
      const user = await UserModel.create(data)
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(MESSAGES[500]);
  }
};

//esto debe ir con get para obtener todo los usuarios

export const obtenerUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: {
        exclude: ["user_id", "password", "createdAt", "updateAt"],
      },
      include: [
          {
              model: TaskModel,
              as: "tarea",
              include:[{
                model:CategoryModel,
                as: "categoria"
              }]
          },
          {
              model: DireccionModel,
              as: "ubicacion"
          }]
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json(MESSAGES[500]);
  }
};

//esto tambien va con el metodo get pero con la id en la ruta
export const obtenerUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userEncontrado = await UserModel.findOne({
      where: { id },
      attributes: {
        exclude: ["user_id", "password", "createdAt", "updatedAt"],
      },
      include: [
          {
              model: TaskModel,
              as: "tarea",
              include:[{
                model:CategoryModel,
                as: "categoria"
              }]
          },
          {
              model: DireccionModel,
              as: "ubicacion"
          }
      ]
    });

    if (!userEncontrado) return res.status(404).json(MESSAGES[404]);

    return res.status(200).json(userEncontrado);
  } catch (error) {
    console.error(error);
    return res.status(500).json(MESSAGES[500]);
  }
};

// nota para mi: el id que nesecitamos compara simpre viene de req que tiene guardo en la propiedad params

//esto debe ir con el metodo put

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const filtroUser = await UserModel.findOne({ where: { id } });

    if (!filtroUser) return res.status(404).json(MESSAGES[404]);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json(MESSAGES[400]);
    }

    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json(MESSAGES[400]);
    }

    const actualizarUser = await UserModel.update(
      { name, email, password },
      { where: { id } },
    );

    return res.status(200).json(actualizarUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json(MESSAGES[500]);
  }
};

//esto va con el metodo delete
export const eliminarUser = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioAborrar = await UserModel.findOne({ where: { id } });

    if (!usuarioAborrar) return res.status(404).json(MESSAGES[404]);

    await usuarioAborrar.destroy();

    return res
      .status(200)
      .json({
        message: "SE BORRO EXITOSAMENTE EL USUARIO DE LA BASE DE DATOS",
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json(MESSAGES[500]);
  }
};
