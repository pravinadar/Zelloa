import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import router from "./routes/routes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
    connectDB();
})