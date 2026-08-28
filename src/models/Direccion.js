import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const DireccionModel = sequelize.define("Direccion",
    {
        calle: {
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: false,
        },
        ciudad:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: false,
        },
        provincia:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: false,
        },
        pais:{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique: false,
        },
        cod_postal:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: "Users",
                key: "id"
            }
        }
    },{
        paranoid:true,
        timestamps: true
    }

)