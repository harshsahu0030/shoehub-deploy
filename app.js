import express from "express";
import dotenv from "dotenv";
import middleware from "./middlewares/error.js";
import { connectDatabase } from "./database/database.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

//dotenv
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser({ extended: true }));

//import routes
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

//routes
app.use("/api/v1", userRoute);
app.use("/api/v1", productRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

//database
connectDatabase();

//error middleware
app.use(middleware);

export default app;
