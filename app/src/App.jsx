import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './composants/Home'
import AllResto from './composants/utilisateur/AllResto'
import MenuResto from './composants/utilisateur/MenuResto';
import Register from './composants/restaurant/Register';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Home />} />
      <Route path='/liste_des_restaurants' element = {<AllResto />} />
      <Route path='/menu_restaurant' element={<MenuResto />} />
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App
