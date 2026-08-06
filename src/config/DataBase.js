import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db","root","", {
    host:"localhost",
    dialect: "mysql"
})

export const DataBaseUp = async ()=>{
    try {
        await sequelize.authenticate();
        await sequelize.sync({force: true})
        console.log("conexion a la base de datos exitosa :)");
    } catch (error) {
        console.log(`lo sentimos ocurrio un error con la base de datos
            erro: ${error}`);
    }
}