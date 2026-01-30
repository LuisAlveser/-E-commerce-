const usercontroller=require("../controller/UserController");
const express=require("express");
const router=express.Router();
 

router.post("/cadastro",usercontroller.cadastro);
router.post("/login",usercontroller.login);
router.patch("/:id",usercontroller.atualizar);
router.delete("/:id",usercontroller.deletar);
module.exports=router;


