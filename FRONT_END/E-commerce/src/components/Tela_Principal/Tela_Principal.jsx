import './Tela_Principal.css'
import { useEffect, useState } from 'react';
import { FaUserCircle ,FaSpinner} from "react-icons/fa";
function Tela_Principal(){
    const[user,setUsuario]=useState(null);
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
    return(
        
        <div className='cabecalho'> 
          <FaUserCircle className='icontela' />
        <h1>{user?.name || "Usuário"}</h1>
          <div className='tag'>{user.role}</div>
          <button className="botaotela"> Sair </button>
           <button className="botaotela"> Adicionar Produtos </button>
        </div>
        
    );
}
export default Tela_Principal;
