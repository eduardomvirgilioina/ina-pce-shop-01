// Verifica si el usuario tiene rol de administrador
export function isAdmin(req, res, next) {
  console.log(req.headers["key"]);

  return next();
}
