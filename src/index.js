import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRouter from "./routes/auth/routes.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/auth", authRouter);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server listening on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });
