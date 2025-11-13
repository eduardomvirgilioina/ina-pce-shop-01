import { sendQueryParams } from "./helpers.js";

const main = async () => {
  try {
    let productos = await sendQueryParams("/api/productos", {});
    console.log("Productos cargados:", productos);
  } catch (error) {
    console.error("Error en main:", error);
  }
};

main();
