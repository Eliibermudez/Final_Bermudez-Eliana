import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import monsterRoutes from "./routes/monsterRoutes.js";
import {notFound, errorHandler,} from "./middleware/errorMiddleware.js";
import missionRoutes from "./routes/missionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/monsters", monsterRoutes);
app.use("/api/missions", missionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de ScreamFactory funcionando correctamente",
  });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
};

startServer();