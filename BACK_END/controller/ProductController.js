const { where } = require("sequelize");
const{Products,Category,User}=require("../models");
const fs = require('fs');
const path = require('path');
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
           const novaImagem = req.file ? req.file.filename : null; ;

        try {
            const buscarproduto =await Products.findByPk(id);
            console.log(buscarproduto)
            if(!buscarproduto){
              return res.status(404).json({message:"Imagen não encontrada"})
            }
             if (buscarproduto.image_url&&novaImagem) {
                console.log(buscarproduto.image_url)
                console.log(buscarproduto.id)
         const oldImagePath = path.resolve(__dirname, '..', 'uploads', buscarproduto.image_url);
          console.log("Tentando deletar:", oldImagePath);
          if (fs.existsSync(oldImagePath)) {
           
           fs.unlinkSync(oldImagePath); 
          
      }
    }

         const produto={
              name:req.body.name,
            description: req.body.description,
           price: req.body.price,
           image_url: novaImagem,
           stock_quantity:req.body.stock_quantity,
    
        }
        
        const [novoproduto]= await Products.update(produto,{where:{id:id}});
        
        if(novoproduto>0){
        return   res.status(200).json({message:"Produto atualizado"});
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
   

async function deletar(req, res) {
    const id = req.params.id;

    try {
        const produto = await Products.findByPk(id);
        
        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

    
        if (produto.image_url) {
            const caminhoImagem = path.join('C:', 'Users', 'Luis', 'Desktop', 'E_commerce', 'BACK_END', 'uploads', produto.image_url);
            
            try {
                await fs.access(caminhoImagem); 
                await fs.unlink(caminhoImagem); 
            } catch (err) {
                console.warn("Aviso: Imagem não encontrada no disco, prosseguindo com a exclusão do banco.");
            }
        }

        
        await Products.destroy({ where: { id: id } });

        return res.status(200).json({ message: "Produto excluído com sucesso" });

    } catch (error) {
        console.error("Erro detalhado:", error); 
        return res.status(500).json({ message: "Erro ao excluir produto no servidor" });
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
async function buscarProdutos_Por_usuario(req,res) {
    const id =req.params.id;
    try {
        const product= await Products.findAll({where:{id_user:id}})
        if(product){
            return res.status(200).json(product);
        }else{
            return res.status(404).json({message:"Não existem produtos relacionados a esse usuário"})
        }

        
    } catch (error) {
         return  res.status(500).json({message:"Erro buscar produto por usuário"});
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
    buscarProdutos_Por_usuario:buscarProdutos_Por_usuario,
}