import { TaskModel } from "./Task.js";
import {  UserModel } from "./User.js";

//uno a muchos
TaskModel.belongsTo(UserModel , {foreignKey: "user_id", as: "Destinatario"});
UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tarea"})

