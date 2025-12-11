// import express from "express"
// import cors from "cors"
// import "dotenv/config"
// import connectDB from "../config/database.js";
// import UserRoute from "../src/routes/UserRoute.js"

// connectDB();

// const app = express();

// app.use(cors());

// app.use(express.json());


// app.get("/test", (req, res)=> {
//     res.json({message: "Hola!"});
// })

// app.use("/user", UserRoute);

// const PORT = process.env.PORT || 5000;

// app.listen(5000, () => {
//     console.log(`servidor corriendo en localhost:${PORT}`);
// })

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/database.js";
import UserRoute from "../src/routes/UserRoute.js";
 connectDB();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
};


// app.use(cors())
app.use(cors(corsOptions));

app.use(express.json());



app.use((req, res, next) => {
  console.log("📥 Petición recibida:", req.method, req.url);
  next();
});
// Rutas

app.options("/test", cors(corsOptions));
app.get("/test", (req,res) => res.json({ message: "Hola!" }));
app.use("/user", UserRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
