import './Tela_Principal.css'
import { useEffect, useState } from 'react';
import { FaUserCircle ,FaSpinner} from "react-icons/fa";
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { RiShoppingBag2Line,RiSubtractFill } from "react-icons/ri";


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
          setbuscar_produtos_por_usuario(buscar_produtos_por_user=>buscar_produtos_por_user.filter(p=>p.id!==produto.id));
          alert("Produto excluido com sucesso")
        }else{
          alert("Erro produto não encontrado")
        } 

      } catch (error) {
         console.warn("Erro em excluir produto",error);
      }
 }
  const [buscar_produtos_por_usuario,setbuscar_produtos_por_usuario]=useState([]);
 useEffect(() => {

    if (user && user.id) {
        buscar_produtos_por_user();
    } else {
        console.log("Aguardando o ID do usuário...");
    }
}, [user]);

const buscar_produtos_por_user=async ()=>{
 
     try {
      const produtos=await axios.get(`http://localhost:3001/product/buscar_produtos_por_usuario/${user.id}`)
     console.log(produtos.data)
      if(produtos.status===200){
         setbuscar_produtos_por_usuario(produtos.data);
        
        
      

      }else{
        alert("Erro em buscar produtos por usuário")
      }
      
     } catch (error) {
       console.warn("Erro em buscar  produtos por usuário",error);
     }
 }

const [carrinho,setcarrinho]=useState([]);
const adicionaritens=(item)=>{
  setcarrinho((carrinho)=>[...carrinho,item]);
  

}
const[carrinhoAberto,setCarrinhoAberto]=useState(false);
const toggleCarrinho = () => {
  setCarrinhoAberto(!carrinhoAberto);
};
const retiraritems=(id)=>{
 carrinho.pop(p=>p.id===id);
 setCarrinhoAberto([...carrinho]);
}

 
    return(
       <>
        <div className='cabecalho'> 
          <FaUserCircle className='icontela' />
        <h1>{user?.name || "Usuário"}</h1>
             {user?.role && <div className='tag'>{user.role}</div>}
             {user?.role==="admin"?<span className='span'><TfiPackage  className='icons_tela' onClick={toggleCarrinho} />{buscar_produtos_por_usuario.length}
             {buscar_produtos_por_usuario&&(
 <div className="modal-carrinho" style={{
    position: 'absolute',
    right: '20px',
    top: '80px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '20px',
    zIndex: 1000,
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    width: '300px',
    
    
  }}>
    <h3 className='carrinho_lista'>Produtos Cadastrados</h3>
    {buscar_produtos_por_usuario.length === 0 ? (
      <p style={{color:"black"}}>Você não cadastrou nenhum produto</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>

        {buscar_produtos_por_usuario.map((item, index) => (
          
          <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee' }}>
           <a className='carrinho_lista'><strong>{item.name}</strong> - R$ {item.price} <MdDelete  style={{ cursor: 'pointer' }}  onClick={()=>{deletarProduto(item)}} className='subtracao' /></a>
          </li>
        ))}
      </ul>
    )}
    <div className='botoes'><button style={{ cursor: 'pointer' }} className="botaocompra"onClick={toggleCarrinho}>Fechar</button>
    
    </div>

  </div>)}
              </span>:<span className='span'>
              <RiShoppingBag2Line  onClick={toggleCarrinho} className='icons_tela'/>{carrinho.length}{carrinhoAberto && (
  <div className="modal-carrinho" style={{
    position: 'absolute',
    right: '20px',
    top: '80px',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '20px',
    zIndex: 1000,
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    width: '300px',
    
    
  }}>
    <h3 className='carrinho_lista'>Seu Carrinho</h3>
    {carrinho.length === 0 ? (
      <p>O carrinho está vazio</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>

        {carrinho.map((item, index) => (
          
          <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee' }}>
           <a className='carrinho_lista'><strong>{item.name}</strong> - R$ {item.price} <RiSubtractFill style={{ cursor: 'pointer' }} onClick={()=>{retiraritems(item.id)}} className='subtracao' /></a>
          </li>
        ))}
      </ul>
    )}
    <div className='botoes'><button  className="botaocompra"onClick={toggleCarrinho}>Fechar</button>
    <button  className="botaocompra">Comprar</button>
    </div>

  </div>
  
)}</span>}
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
      {user?.role==="admin"?"":<span> <button  style={{ cursor: 'pointer' }}  onClick={()=>{adicionaritens(produto)}} className='botaocarrinho'>Adicionar ao Carrinho</button></span>}
    </li>
  ))}
</ul>
</div>
    </>

        
           
        
    );
}
export default Tela_Principal;
