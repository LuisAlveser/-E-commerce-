const express= require("express");
const categoryController=require("../controller/CategoryController");
const router=express.Router();

router.post("/",categoryController.adicionar);
router.patch("/:id",categoryController.atualizar);
router.delete("/:id",categoryController.excluir);
router.get("/",categoryController.todasCategorias);
router.get("/:id",categoryController.cateroriaporId);
module.exports=router;