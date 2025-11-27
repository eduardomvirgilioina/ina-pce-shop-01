// import {} from ''
// export o export default
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const servidor = express();

// Configuraciones
servidor.set("port", process.env.PORT || 3000);
servidor.use(cors()); // Habilita CORS para todas las rutas
servidor.use(morgan("dev")); // Registra las peticiones HTTP en la consola
servidor.use(express.json()); // Parseo de peticiones con body application/json
servidor.use(express.urlencoded({ extended: true })); // Parseo de peticiones con body y query

servidor.use(
  express.static(join(dirname(fileURLToPath(import.meta.url)), "../public"))
); // Archivos estáticos

// Rutas
import productoRoutes from "./routes/producto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import comprasRoutes from "./routes/compras.routes.js";

servidor.use("/api/productos", productoRoutes);
servidor.use("/api/usuarios", usuarioRoutes);
servidor.use("/api/compras", comprasRoutes);

servidor.listen(servidor.get("port"), () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${servidor.get("port")}`
  );
});
