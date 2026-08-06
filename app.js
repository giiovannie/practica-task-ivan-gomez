import express from "express"

const app = express();
app.use(express.json());

let port = 3000;

app.listen(port, ()=>{
    console.log(`se ensendio el server correctamente en el puerto ${port}`)
})

