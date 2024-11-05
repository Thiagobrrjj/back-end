import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./routes/routes";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

dotenv.config();

const dbUser = "olx"
const dbPassword = "Q91zjxe036194XsN"
const PORT = 30001;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@olx.prx5d.mongodb.net/?retryWrites=true&w=majority&appName=olx`
  )
  .then(() => {
    app.listen(PORT);
    console.log("Conectou ao Banco");
  })
  .catch((err) => {
    console.log("erro ao se conectar: ", err);
  });

app.use("/src/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
