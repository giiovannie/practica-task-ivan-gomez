import { TaskModel } from "./Task.js";
import { CategoryModel } from "./Category.js";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskCategoryModel = sequelize.define(
    "Task_Category",
    {
        id_Task_Category: {
            primaryKey:true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        }
    }
) 
