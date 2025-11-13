import { Router } from "express";
import {
  list,
  get,
  create,
  update,
  remove,
} from "../controllers/producto.controller.js";
import upload from "../middlewares/archivos.js";

const router = Router();
router.get("/", list);
router.get("/:slug", get);
router.post("/", [upload.any()], create);
router.put("/:slug", update);
router.delete("/:slug", remove);
export default router;
