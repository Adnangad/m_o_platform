import express from "express";
import authRoutes from "./routes/auth.ts";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.listen(3000, ()=> {
    console.log("Server is listening on port 3000");
});