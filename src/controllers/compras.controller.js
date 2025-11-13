export function list(req, res) {
  res.send("Lista de compras");
}
export function get(req, res) {
  const { id } = req.params;
  res.send(`Detalle del compra: ${id}`);
}
export function create(req, res) {
  const data = req.body;
  res.send("Crear una nueva compra");
}
export function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  res.send(`Actualizar la compra: ${id}`);
}
export function remove(req, res) {
  const { id } = req.params;
  res.send(`Eliminar la compra: ${id}`);
}
