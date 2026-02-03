import './Tela_Principal.css'
import { useEffect, useState } from 'react';
import { FaUserCircle ,FaSpinner} from "react-icons/fa";
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
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
      navigate("/Tela_Cadastro_Produto");
 }
    return(
       <>
        <div className='cabecalho'> 
          <FaUserCircle className='icontela' />
        <h1>{user?.name || "Usuário"}</h1>
             {user?.role && <div className='tag'>{user.role}</div>}
          <button className="botaotela" style={{ cursor: 'pointer' }}  onClick={sair} > Sair </button>
           <button className="botaotela" style={{ cursor: 'pointer' }}  onClick={Cadastro_Produto}> Adicionar Produtos </button>
        <div className='divisor'>{   <ul>
      {categorias.map((categoria) => (
        <li onClick={()=>listarProdutosporCat(categoria.id)}   style={{ cursor: 'pointer' }}  key={categoria.id}>{categoria.name}</li>
      ))}
    </ul>}</div>
        </div>
   
<div className='conteudo-abaixo' style={{ marginTop: '170px', padding: '20px' }}>
  <ul className="lista-produtos"> 
    {mostrarTodosProdutos.map((produto) => (
      <li 
        className='conteudo_produtos' 
        onClick={() => listarProdutosporCat(produto.id)} 
       
        key={produto.id}
      >
        <span>{produto.name}</span>
         <span><img style={{ width: '100px', height: '100px', objectFit: 'cover', }} src={`http://localhost:3001/uploads/${produto.image_url}`} ></img></span>
        <span>{"R$: " + produto.price}</span>
      </li>
    ))}
  </ul>
</div>
    </>

        
           
        
    );
}
export default Tela_Principal;
