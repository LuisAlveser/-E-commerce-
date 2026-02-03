import './Tela_Cadastro_Produto.css'
import { useEffect, useState } from 'react';
import axios from "axios";
 function Tela_Cadastro_Produto(){
    const[nome_produto,setNomeProduto]=useState("");
    const[descricao_produto,setdescricaoProduto]=useState("");
    const[imagem_produto,setimagemProduto]=useState(null);
    const[preco_produto,setPreco_Produto]=useState("");
    const[categoria_produto,setCategoriaProduto]=useState("");
    const[quantidade,setQuantidade]=useState("");

    const buscarcategoriapornome= async(nome_da_categoria)=>{
        try {
            const nome= await axios.get(`http://localhost:3001/category/filter/${nome_da_categoria}`);
          
        if(nome.status===200){
             return nome.data;
        } 
        else{
          return    alert("O nome da categoria está errado")
        }
        } catch (error) {
           return alert("Erro em busca nome da categoria")
        }
       
        
    }
    const cadastrar_produto=async (e)=>{
        e.preventDefault();
        const categoriaencontrada = await buscarcategoriapornome(categoria_produto);
        
       
       

       try {
        const token =localStorage.getItem("token")
        const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const dadosDecodificados = JSON.parse(window.atob(base64));

        const formData = new FormData();
        formData.append("name", nome_produto);
        formData.append("description", descricao_produto);
        formData.append("price", preco_produto);
        formData.append("stock_quantity", quantidade);
        formData.append("id_category", categoriaencontrada[0].id);
        formData.append("image_url", imagem_produto);
        formData.append("id_user",dadosDecodificados.id);
        
        const resposta = await axios.post("http://localhost:3001/product/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization":`Bearer ${token}`
            }
        });
 
     if(resposta.status==201){
        alert("Produto cadastrado com sucesso")
     }

       } catch (error) {
        alert("Erro em cadastrar produto")
       }
       
            

    }
    return (
        <>
         < div className='fundo'>
              <h1> Cadastrar Produto </h1>
               <form className='form' onSubmit={cadastrar_produto}>
                
            
                <label className='label'>
                <a>Nome:</a>
                <input className='input' type="text" value={nome_produto} onChange={(e)=>setNomeProduto(e.target.value)} />
                </label>
        
                 <label  className='label'>
             Descrição:
                 <input className='input' type="text" value={descricao_produto} onChange={(e)=>setdescricaoProduto(e.target.value)} />
                 </label>
                
                 <label  className='label'>
               <a>Preço:</a>
                <input  className='input' type="texto" value={preco_produto} onChange={(e)=>setPreco_Produto(e.target.value)} />
                
                </label>
                 <label  className='label'>
               <a>Categoria:</a>
                <input  className='input' type="text" value={categoria_produto} onChange={(e)=>setCategoriaProduto(e.target.value)} />
                </label>
                
                 <label  className='label'>
               <a>Estoque:</a>
                <input  className='input' type="number" value={quantidade} onChange={(e)=>setQuantidade(e.target.value)} />
                </label>

                 <label  className='label'>
              <a>Imagem:</a> 
                <input  className='input' type="file" onChange={(e)=>setimagemProduto(e.target.files[0])} />
                </label>
                  
        
                  
                        <button className="botao1">Adicionar Produto </button>
                </form>
              
                 
                  
              </div>
        </>
    );
}
export default Tela_Cadastro_Produto;