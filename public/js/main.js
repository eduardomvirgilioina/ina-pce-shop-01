import { sendQuery, isLogged, currency, getCart, setCart } from "./helpers.js";

const userBar = document.querySelector("#userBar");
const websiteBar = document.querySelector("#websiteBar");
const productList = document.querySelector("#productos");
const loader = document.querySelector("#loader");
const btnLogout = document.querySelector("#logout");
const main = async () => {
  try {
    const user = isLogged();
    if (user) {
      websiteBar.style.display = "none";
      userBar.style.display = "flex";
    } else {
      websiteBar.style.display = "flex";
      userBar.style.display = "none";
    }
    productList.style.display = "none";
    let productos = await sendQuery("/api/productos");
    generateListProducts(productos);
  } catch (error) {
    console.error("Error en main:", error);
  } finally {
    loader.style.display = "none";
    productList.style.display = "flex";
  }
};

const generateListProducts = (productos) => {
  productList.innerHTML = null;
  const user = isLogged();
  for (const producto of productos) {
    const template = document.createElement("li");
    const imageContainer = document.createElement("picture");
    const dataContainer = document.createElement("dd");
    const tagsContaner = document.createElement("ul");
    const actionForm = document.createElement("form");

    imageContainer.innerHTML = producto.imagen_url
      ? `<img src="${producto.imagen_url}" alt="Imagen del producto ${producto.slug}"/>`
      : `<img src="http://placehold.co/400/orange/white?text=Sin%20Imagen" alt="Sin imagen disponible"/>`;
    dataContainer.innerHTML = `<dt>Nombre</dt>
                    <dd>${producto.nombre}</dd>
                    <dt>Detalle</dt>
                    <dd>
                        ${producto.descripcion}
                    </dd>
                    <dt>Categoria</dt>
                    <dd>${producto.categorias.nombre}</dd>
                    <dt>Precio</dt>
                    <dd>${currency(producto.precio)} ARS</dd>`;
    tagsContaner.innerHTML = `${producto.etiquetas
      .map((e) => `<li>${e.nombre}</li>`)
      .join("")}`;
    template.append(imageContainer, dataContainer, tagsContaner);

    if (user) {
      let carrito = getCart();
      const btnCart = document.createElement("button");
      btnCart.type = "button";
      const empty = carrito.length === 0;
      const exist = carrito.some((item) => item.producto.id === producto.id);
      btnCart.innerHTML =
        empty || !exist ? "Añadir al carrito" : "Aumentar cantidad";
      btnCart.onclick = async (e) => {
        if (empty) {
          carrito.push({ producto, cantidad: 1 });
          setCart(carrito);
          return await main();
        }
        if (exist) {
          carrito = carrito.map((item) => {
            if (item.producto.id === producto.id) {
              item.cantidad += 1;
            }
            return item;
          });
          setCart(carrito);
          return await main();
        }
      };
      actionForm.append(btnCart);
      template.append(actionForm);
    }
    productList.append(template);
  }
};

btnLogout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("usuario");
  window.location.reload();
});

main();
