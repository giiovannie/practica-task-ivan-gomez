import { DataTypes } from "sequelize";
import { sequelize } from "../config/DataBase.js";

export const TableTask = sequelize.define("Task",
    {
        title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
) 

