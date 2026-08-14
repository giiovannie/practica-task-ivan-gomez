import { DireccionModel } from "./Direccion.js";
import { TaskModel } from "./Task.js";
import {  UserModel } from "./User.js";

//uno a muchos
TaskModel.belongsTo(UserModel , {foreignKey: "user_id", as: "Destinatario"});
UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tarea"})

//uno a uno
DireccionModel.belongsTo(UserModel, {foreignKey: "user_id", as: "author"});
UserModel.hasOne(DireccionModel, {foreignKey: "user_id", as: "ubicacion"})