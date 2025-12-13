import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "../config/database.js";
import UserRoute from "../src/routes/UserRoute.js"
import MovieRoute from "./routes/movieRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/test", (req, res)=> {
    res.json({message: "Hola!"});
})

app.use("/user", UserRoute);
app.use("/movies", MovieRoute)

const PORT = process.env.PORT || 8000;

app.listen(8000, () => {
    console.log(`servidor corriendo en localhost:${PORT}`);
})
