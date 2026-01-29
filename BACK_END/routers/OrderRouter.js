const express= require("express");
 const router= express.Router();
const orderController=require("../controller/OrderController");
const check_auth= require("../middeware/check-auth");
 router.post("/",check_auth.check_auth,orderController.adicionar);
router.get("/",check_auth.check_auth,orderController.mostrarPedidos);
router.patch("/:id",check_auth.check_auth,orderController.atualizar);
router.delete("/:id",check_auth.check_auth,orderController.deletarPedido);
 module.exports=router;