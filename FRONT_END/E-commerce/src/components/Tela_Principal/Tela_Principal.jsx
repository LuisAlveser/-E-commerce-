import './Tela_Principal.css'
import { useEffect, useState } from 'react';
import { FaUserCircle ,FaSpinner} from "react-icons/fa";
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


function Tela_Principal(){
const navigate =useNavigate();




    const[user,setUsuario]=useState(null);
   
    
    const sair=(e)=>{
        localStorage.removeItem("token"); 
        navigate("/");
    }
    useEffect(() => {
  try {
   
    const token = localStorage.getItem("token");
    
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
     
      const dadosDecodificados = JSON.parse(window.atob(base64));
        setUsuario(dadosDecodificados);
    if (dadosDecodificados) {
         setUsuario(dadosDecodificados);

    } else {
      console.warn("Nenhum usuário encontrado no localStorage.");
    }
  } catch (error) {
    console.error("Erro crítico ao processar o JSON do usuário:", error);
   
  }
}, []);
 const [Produtos_por_categoria,setProdutos_por_categoria]=useState([]);

  const mostrarProdutos_Por_Categoria= async(id)=>{
    try {
      const produtos_por_categoria=await axios.get(`http://localhost:3001/product/buscar_por_categoria/${id}`)
      if(produtos_por_categoria.status===200){
        setProdutos_por_categoria(produtos_por_categoria.data);
      }else{
            alert("Erro em buscar produtos por categoria:");
          }
    } catch (error) {
       console.error("Erro em buscar produtos por categoria:", error);
    }
  }
  
 
const [categorias,setCategorias]=useState([]);
 useEffect(()=>{
    const mostrarCategorias=async ()=>{
     try {
        
          const  resposta= await axios.get("http://localhost:3001/category");
          if(resposta.status===200){
            setCategorias(resposta.data);
          }
          else{
            alert("Erro em buscar categorias");
          }
        
     } catch (error) {
          console.warn("Erro em buscar categorias");
     }
    }
    mostrarCategorias();
 },[]);
 const listarProdutosporCat=(id)=>{
    console.log(id);
 }
 const [mostrarTodosProdutos,setMostrarProdutos]=useState([]);
 useEffect(()=>{
    const mostrarProdutos=async ()=>{
        try {
            const produtos =await axios.get("http://localhost:3001/product");
            if(produtos.status===200){
                setMostrarProdutos(produtos.data);
            }else{
                alert("Erro em buscar produtos");
            }
        } catch (error) {
             console.warn("Erro em buscar produtos");
        }
    }
    mostrarProdutos();
 },[]);
 const Cadastro_Produto=(e)=>{
      navigate("/Tela_Cadastro_Produto",{state:{user:user}});
 }
 const deletarProduto=async (produto)=>{
   
     const id =produto.id
      try {
        const resposta= await axios.delete(`http://localhost:3001/product/${id}`);
        if(resposta.status===200){
          setProdutos_por_categoria(Produtos_por_categoria=>Produtos_por_categoria.filter(p=>p.id!==produto.id));
          setMostrarProdutos(mostrarTodosProdutos=>mostrarTodosProdutos.filter(p=>p.id!==produto.id));
          alert("Produto excluido com sucesso")
        }else{
          alert("Erro produto não encontrado")
        } 

      } catch (error) {
         console.warn("Erro em excluir produto",error);
      }
 }
    return(
       <>
        <div className='cabecalho'> 
          <FaUserCircle className='icontela' />
        <h1>{user?.name || "Usuário"}</h1>
             {user?.role && <div className='tag'>{user.role}</div>}
          <button className="botaotela" style={{ cursor: 'pointer' }}  onClick={sair} > Sair </button>
       {user?.role==="admin"? <button className="botaotela" style={{ cursor: 'pointer' }}  onClick={Cadastro_Produto}> Adicionar Produtos </button>:""}
        <div className='divisor'>{   <ul>
      {categorias.map((categoria) => (
        <li onClick={()=>mostrarProdutos_Por_Categoria(categoria.id)}   style={{ cursor: 'pointer' }}  key={categoria.id}>{categoria.name}</li>
      ))}
    </ul>}</div>
        </div>
   
<div className='conteudo-abaixo' style={{ marginTop: '170px', padding: '20px' }}>
 <ul className="lista-produtos"> 
  
  {(Produtos_por_categoria.length > 0 ? Produtos_por_categoria : mostrarTodosProdutos).map((produto) => (
    <li className='conteudo_produtos' key={produto.id}>
      <div className="container-nome-opcoes" style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <span className='nomeproduto'>{produto.name}
          {user?.id === produto.id_user && (
          <div className="opcoes">
            <FaPen className='icon_pen' style={{ cursor: 'pointer' }} /> 
            <MdDelete className='icon_delete' onClick={()=>{deletarProduto(produto)}} style={{ cursor: 'pointer' }} />
          </div>
        )}
        </span>
        
        
        
      </div>

      <span>
        <img 
          style={{ width: '200px', height: '150px', objectFit: 'cover',borderRadius:"20px" }} 
          src={`http://localhost:3001/uploads/${produto.image_url}`} 
          alt={produto.name}
        />
      </span>
      <span>{"R$ " + produto.price}</span>
    </li>
  ))}
</ul>
</div>
    </>

        
           
        
    );
}
export default Tela_Principal;
