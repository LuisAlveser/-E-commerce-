const express= require("express");
 const router= express.Router();
const orderController=require("../controller/OrderController");

 router.post("/",orderController.adicionar);
router.get("/",orderController.mostrarPedidos);
router.patch("/:id",orderController.atualizar);
router.delete("/:id",orderController.deletarPedido);
 module.exports=router;