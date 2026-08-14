import express from "express"
import { DataBaseUp } from "./src/config/database.js";
import { UserRoutes } from "./src/routes/user.route.js";
import { TaskRouter } from "./src/routes/task.routes.js";
import "./src/models/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", UserRoutes)
app.use("/api/tasks", TaskRouter)


let port = process.env.PORT;

app.listen(port, async ()=>{
    try {
        await DataBaseUp()
        console.log(`se ensendio el server correctamente en el puerto ${port}`)
    } catch (error) {
        console.log(`lo siento ocurrio un error en levantar el server :(`);
    }
});
