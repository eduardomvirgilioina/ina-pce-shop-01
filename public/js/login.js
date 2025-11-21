import { sendJsonData, isLogged, isAdmin } from "./helpers.js";
const loginForm = document.querySelector("#loginForm");
const errorForm = document.querySelector("#errorForm");
const btnClave = document.querySelector("#btnClave");
const regxEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexClave =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fields = e.target.elements;
  const email = fields.email;
  const clave = fields.clave;
  const emailValue = String(email.value).trim();
  const claveValue = String(clave.value).trim();
  errorForm.innerHTML = "";
  if (emailValue.length === 0 || claveValue.length === 0) {
    errorForm.innerHTML = "Completar los campos";
    return;
  }
  if (!regxEmail.test(emailValue)) {
    errorForm.innerHTML = "El formato del correo no es valido";
    return;
  }
  if (!regexClave.test(claveValue)) {
    errorForm.innerHTML =
      "La clave de tener minimo 8 carateres, 1 mayuscula, 1 numero y un caracter especial";
    return;
  }
  try {
    const respuesta = await sendJsonData("/api/usuarios/access", "POST", {
      email: emailValue,
      clave: claveValue,
    });
    if (respuesta?.msg) {
      errorForm.innerHTML = respuesta.msg;
      return;
    }
    if (respuesta?.data) {
      localStorage.setItem("usuario", JSON.stringify(respuesta.data));
    }
    if (isAdmin()) {
      window.location.href = "admin.html";
    } else if (isLogged()) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.log(error.msg);
  }
});

btnClave.addEventListener("click", (e) => {
  e.preventDefault();
  const btn = e.target;
  const field = btn.closest("fieldset");
  const input = field.querySelector("input");
  const type = input.type;
  input.setAttribute("type", type === "password" ? "text" : "password");
});
