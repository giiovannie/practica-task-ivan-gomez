import { TableTask } from "./Task.js";
import { TableUser } from "./User.js";

TableTask.belongsTo(TableUser , {foreignKey: "user_id"});
TableUser.hasMany(TableTask, {foreignKey: "user_id"})

