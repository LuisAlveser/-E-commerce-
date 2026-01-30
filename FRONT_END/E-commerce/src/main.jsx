import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Tela_Principal from '../src/components/Tela_Principal/Tela_Principal.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<App/>}/>
     <Route path='/Tela_principal' element={<Tela_Principal/>}/>
</Routes>
    </BrowserRouter>
  </StrictMode>,
)
