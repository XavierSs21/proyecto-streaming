
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/database.js";
import UserRoute from "../src/routes/UserRoute.js";
 connectDB();

const app = express();

// const corsOptions = {
//   origin: "http://localhost:5173", 
//   methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
// };


app.use(cors())
// app.use(cors(corsOptions));

app.use(express.json());

app.get("/test", (req,res) => res.json({ message: "Hola!" }));
app.use("/user", UserRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
