import express from "express";
import cors from "cors";
import playerRouter from "./src/players/playerRouter.js";

const app = express();
const PORT = process.env.PORT || 3000 || 3001 || 4000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.send("API REST Radio Deportes");
});

// Rutas personalizadas
app.use("/", playerRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
