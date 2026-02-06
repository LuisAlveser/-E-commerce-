const ProductController=require("../controller/ProductController");
const express =require("express");
const router= express.Router();
const check_auth= require("../middeware/check-auth");
const multer = require('multer');
const path = require('path');
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get("/buscar_por_categoria/:id",ProductController.buscarProduto_Por_categoria);
router.post("/",upload.single('image_url'),ProductController.adicionar);
router.get("/",ProductController.mostrarProdutos);
router.get("/:id",ProductController.mostrarProdutosporId);
router.patch("/:id",ProductController.atualizar);
router.patch("/adicionarStok/:id",ProductController.adicionarStok);
router.patch("/diminuirStok/:id",ProductController.diminuirStok);
router.delete("/:id",ProductController.deletar);
router.get("/buscar_produtos_por_usuario/:id",ProductController.buscarProdutos_Por_usuario);
module.exports=router;