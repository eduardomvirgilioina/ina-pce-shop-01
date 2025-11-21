import { sendQuery, isLogged, currency } from "./helpers.js";

const usuario = isLogged();

if (!usuario) {
  window.location.href = "index.html";
}
const userData = document.querySelector("#userData");
const userOrders = document.querySelector("#compras");
const userContent = document.querySelector("#content");
const loader = document.querySelector("#loader");
const main = async () => {
  try {
    userContent.style.display = "none";
    userData.innerHTML = "";
    userOrders.innerHTML = "";
    const { data } = await sendQuery(`/api/usuarios/${usuario.id}`);
    userData.innerHTML = `
         <dt>Nombre</dt>
                <dd>${data.nombre}</dd>
                <dt>Rol</dt>
                <dd>${data.es_admin ? "Administrador" : "Cliente"}</dd>
    `;
    for (const compra of data.ordenes) {
      const template = document.createElement("li");
      template.innerHTML = `
      <dl>
                    <dt>Numero</dt>
                    <dd>N°: ${compra.id}</dd>
                    <dt>Total</dt>
                    <dd>${currency(compra.total)} ARS</dd>
                </dl>
                <a href="compra.html?id=${compra.id}">Ver Detalle</a>`;
      userOrders.append(template);
    }
  } catch (error) {
    console.log(error);
  } finally {
    userContent.style.display = "flex";
    loader.style.display = "none";
  }
};

main();
