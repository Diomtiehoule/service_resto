import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './composants/Home'
import AllResto from './composants/utilisateur/AllResto'
import MenuResto from './composants/utilisateur/MenuResto';
import Register from './composants/restaurant/Register';
import Login from "./composants/restaurant/Login"
import MonResto from './composants/restaurant/MonResto';
import Footer from './composants/restaurant/Footer';
import Gestion from './composants/restaurant/Gestion';
import CodeQR from './composants/restaurant/CodeQR';
import Profil from './composants/restaurant/Profil';
import Resto from './composants/utilisateur/Resto';
import Menu from './composants/Menu';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home />} />
      <Route path='/liste_des_restaurants' element = {<AllResto />} />
      <Route path='/menu_restaurant' element={<MenuResto />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/restaurant' element={<MonResto/>} />
      <Route path='/gestion' element={<Gestion/>} />
      <Route path='/profil' element={<Profil/>} />
      <Route path='/qrcode' element={<CodeQR/>} />
      <Route path='/restaurant/:id' element={<Resto/>} />
      <Route path='/menu/:id' element={<Menu />} />
    </Routes>
    
    </BrowserRouter>
    {/* <CodeQR /> */}
    </>
  )
}

export default App
