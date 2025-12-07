import express from "express"
import cors from "cors"
import "dotenv/config"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test", (req, res)=> {
    res.json({message: "Hola!"});
})

app.listen(5000, () => {
    console.log("servidor corriendo en localhost:5000");
})
