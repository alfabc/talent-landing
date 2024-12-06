import express from "express";
import path from "node:path";

const app = express();
const port = process.env.PORT || 5176;

// Servir archivos estáticos desde la carpeta 'landing/dist'
const LANDING_DIST = path.join(__dirname, "..", "..", "landing", "dist");

app.use(express.static(LANDING_DIST));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});