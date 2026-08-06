import { sequelize } from "../config/DataBase.js";
import { DataTypes } from "sequelize";

export const TableUser = sequelize.define("User", 
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull:false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }
) 