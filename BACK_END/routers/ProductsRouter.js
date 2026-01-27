const ProductController=require("../controller/ProductController");
const express =require("express");
const router= express.Router();

router.post("/",ProductController.adicionar);
router.get("/",ProductController.mostrarProdutos);
router.get("/:id",ProductController.mostrarProdutosporId);
router.patch("/:id",ProductController.atualizar);
router.patch("/adicionarStok/:id",ProductController.adicionarStok);
router.patch("/diminuirStok/:id",ProductController.diminuirStok);
router.delete("/:id",ProductController.deletar);
module.exports=router;