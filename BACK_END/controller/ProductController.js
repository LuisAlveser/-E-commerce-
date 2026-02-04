const { where } = require("sequelize");
const{Products,Category,User}=require("../models");
const fs = require('fs/promises');
async function adicionar(req,res) {
    try {

      const imagem_nome = req.file ? req.file.filename : null;
    
        const produtos={
            name:req.body.name,
            id_category:req.body.id_category,
            description: req.body.description,
           price: req.body.price,
           image_url: imagem_nome,
           stock_quantity:req.body.stock_quantity,
           id_user:req.body.id_user
        }
        const newprodutos= await Products.create(produtos);
        if(newprodutos){
            return res.status(201).json({message:"Produto criado"});
        }
        
    } catch (error) {
          return  res.status(500).json({message:"Erro em adicioinar produtos"}); 
    }
    
}
async function mostrarProdutos(req,res) {
    try {
        
         const produtos=await Products.findAll({
  include: [{model: Category },{model:User}]});
         if(produtos){
            return res.status(200).json(produtos);
         }

    } catch (error) {
        return  res.status(500).json({message:"Erro em mostrar produtos"}); 
    }
  
    
}

    async function atualizar(req,res) {
        const id =req.params.id;
        try {
          const produto={
             name:req.body.name,
            id_category:req.body.id_category,
            description: req.body.description,
           price: req.body.price,
           image_url: req.body.image_url,
           stock_quantity:req.body.stock_quantity
        }
        const novoproduto= await Products.update(produto,{where:{id:id}});
        if(novoproduto>0){
          res.status(200).json({message:"Produto atualizado"});
        }

        } catch (error) {
             return  res.status(500).json({message:"Erro atualizar produto"});
        }

        
    }
   async function mostrarProdutosporId(req,res) {
        const id= req.params.id;
        try {
            const produto= await Products.findOne({where:{id:id}, include: [{ model: Category}]});

            if(produto){
               return res.status(200).json(produto);
            }
            return res.status(404).json({message:"Produto não encontrado "});
        } catch (error) {
              return  res.status(500).json({message:"Erro em mostrar produtos"}); 
        }        
    }
    async function adicionarStok(req,res) {
        const id =req.params.id;
        const quantidade=req.body.quantidade;
          
        try {
        const produto = await Products.findByPk(id);
         if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
          const stok=await produto.increment('stock_quantity', { by: parseInt(quantidade) });
        
          res.status(200).json({message:"Estoque adicionado"});
        

        } catch (error) {
             return  res.status(500).json({message:"Erro atualizar produto"});
        }

        
    }
    async function diminuirStok(req,res) {
        const id =req.params.id;
        const quantidade=req.body.quantidade;
          
        try {
        const produto = await Products.findByPk(id);
         if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
          const stok=await produto.decrement('stock_quantity', { by: parseInt(quantidade) });
        
          res.status(200).json();
        

        } catch (error) {
             return  res.status(500).json({message:"Erro atualizar produto"});
        }

        
    }
    async function deletar(req,res) {
        const id=req.params.id;
        


        try {
            const imagem= await Products.findByPk(id); 
            if(!imagem){
                return res.status(404).json({message:"Produto não encontrado"});
            }
            const nomeArquivo = imagem.image_url;
            await fs.unlink(`C:/Users/Luis/Desktop/E_commerce/BACK_END/uploads/${nomeArquivo}`)
            const produto=await Products.destroy({where:{id:id}});
          if(produto){
              return  res.status(200).json({message:"Produto excluido com sucesso"});
          }  
          return res.status(404).json({message:"Produto não encontrado"});
        } catch (error) {
              return  res.status(500).json({message:"Erro excluir produto"});
        }
        
    }
async function buscarProduto_Por_categoria(req,res) {
    const id =req.params.id;
    try {
        const product= await Products.findAll({where:{id_category:id},include: [{ model: Category}]});
        if(product){
          return  res.status(200).json(product);
        }else{
             return res.status(404).json({message:"Não existem produtos nesse categoria"});
        }
    } catch (error) {
         return  res.status(500).json({message:"Erro buscar produto"});
    }    
}
module.exports={
    adicionar:adicionar,
    mostrarProdutos:mostrarProdutos,
    mostrarProdutosporId:mostrarProdutosporId,
    atualizar:atualizar,
    adicionarStok:adicionarStok,
    diminuirStok:diminuirStok,
    deletar:deletar,
    buscarProduto_Por_categoria:buscarProduto_Por_categoria,
}