import { CategoryModel } from "./Category.js";
import { DireccionModel } from "./Direccion.js";
import { TaskModel } from "./Task.js";
import {  UserModel } from "./User.js";
import { TaskCategoryModel } from "./Task_Category.js";

//uno a muchos 1:N
TaskModel.belongsTo(UserModel , {foreignKey: "user_id", as: "Destinatario"});
UserModel.hasMany(TaskModel, {foreignKey: "user_id", as: "tarea"})

//uno a uno 1:1
DireccionModel.belongsTo(UserModel, {foreignKey: "user_id", as: "author"});
UserModel.hasOne(DireccionModel, {foreignKey: "user_id", as: "ubicacion"});

// muchos a muchos n:m

TaskModel.belongsToMany(CategoryModel, {through: TaskCategoryModel ,foreignKey: "task_id", as: "categoria" });
CategoryModel.belongsToMany(TaskModel, {through: TaskCategoryModel , foreignKey: "category_id", as: "tareas"})