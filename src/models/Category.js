import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const CategoryModel = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});