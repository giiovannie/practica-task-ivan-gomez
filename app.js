import express from "express"
import { DataBaseUp } from "./src/config/DataBase.js";
import { UserRoutes } from "./src/routes/User.route.js";

const app = express();

app.use(express.json());
app.use("/api/users", UserRoutes)



let port = 3000;

app.listen(port, async ()=>{
    try {
        await DataBaseUp()
        console.log(`se ensendio el server correctamente en el puerto ${port}`)
    } catch (error) {
        console.log(`lo siento ocurrio un error en levantar el server :(`);
    }
});
