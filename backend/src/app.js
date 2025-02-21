import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.routes.js"
const app = express(); 


const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(cookieParser());


app.use('/api/v1/users',userRoutes)
app.get('/',(req,res)=>res.send("Welcome"));

export default app;

