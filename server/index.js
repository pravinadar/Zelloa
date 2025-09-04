import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";

const app = express();

const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173", // testing in development
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/",(req,res)=>{
    res.send("API is running....");
})

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
    connectDB();
})