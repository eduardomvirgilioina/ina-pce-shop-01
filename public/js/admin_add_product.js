import { isLogged, isAdmin, sendFormData, sendJsonData } from "./helpers.js";
const user = isAdmin();
if (!user) {
  window.location.href = "/login.html";
}
const productForm = document.querySelector("#productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const elements = productForm.elements;
  const imagen = elements["imagen"].files;
  if (imagen.length !== 0) {
    const response = await sendFormData(
      "/api/productos",
      "POST",
      {
        nombre: elements["nombre"].value,
        slug: elements["slug"].value,
        descripcion: elements["descripcion"].value,
        precio: elements["precio"].value,
        categoria: elements["categoria"].value,
        etiquetas: elements["etiquetas"].value,
        imagen: imagen[0],
      },
      {
        Authorization: isLogged()?.id,
      }
    );
    if (response) {
      alert("Producto creado con éxito");
    } else {
      alert("Error al crear el producto");
    }
  } else {
    const response = await sendJsonData(
      "/api/productos",
      "POST",
      {
        nombre: elements["nombre"].value,
        slug: elements["slug"].value,
        descripcion: elements["descripcion"].value,
        precio: elements["precio"].value,
        categoria: elements["categoria"].value,
        etiquetas: elements["etiquetas"].value,
      },
      { Authorization: isLogged()?.id }
    );
    if (response) {
      alert("Producto creado con éxito");
    } else {
      alert("Error al crear el producto");
    }
  }
});
