import React , {useState , useEffect }from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { get_cookie } from '../cookie/cookie';
import url_api from '../api/api';
import photo from '../media/menu.jpg'
import Pagination from './restaurant/Pagination';
import './menu.css'
import Footer from './restaurant/Footer';
import NavBar from './utilisateur/NavBar';

function Menu() {
    

    let navigate = useNavigate()
    const  {id}  = useParams()
    console.log(id)

    const [ resto , setResto ] = useState([])

    const cookie = get_cookie('cookie_service_resto')
    // if(!cookie) navigate('/login')
    console.log(cookie)

    const [ allCategories , setAllCategories ] = useState([])
    const [ allMenu , setAllMenu ] = useState([])
    const [ menu , setMenu ] = useState([])
    const [ menuCat , setMenuCat] = useState([])
    console.log(menu)
    console.log(menuCat)
    console.log(allMenu)
    console.log(allCategories)

    


    const showMenuCategorie = (n) =>{
        console.log("id de la categorie" , n)
        fetch(url_api+`menu/categorie/${n}` , {method : 'GET'})
        .then(res => res.json())
        .then(menus =>{
            console.log('........----------', menus.menus.rows)
            setMenuCat(menus.menus.rows)
            console.log(menuCat)
            
            let zone = document.querySelector('.ls-menu')
        //     zone.innerHTML=` {menuCat.map(menu => {
        //     return (
        //         <>
        //          <div className="menu-space">
        //     <div className="img-menu">
        //         <img src=${photo} alt="" />
        //     </div>
        //     <div className="info-menu">
        //         <p>${menu.nom}</p>
        //         <p>${menu.category}</p>
        //         <p>${menu.prix} CFA</p>
        //     </div>
        // </div>
        //         </>
        //     )
        // })} `
        })
        

        
    }

    useEffect(()=>{
        fetch(url_api+`menu/${id}` ,{
            method : 'GET'
        })
        .then(res => res.json())
        .then(menu =>{
            console.log('liste des menu' , menu.menus.rows)
            setAllMenu(menu.menus.rows)
            console.log(allMenu)
        })
        fetch(url_api+`categorie/${id}` , {method : 'GET'})
        .then(res => res.json())
        .then(categorie =>{
            console.log('--------', categorie.categorie.rows)
            setAllCategories(categorie.categorie.rows)
            console.log(allCategories)
        })
        fetch(url_api+`menu/categorie/${id}` , {method : 'GET'})
        .then(res => res.json())
        .then(menus =>{
            console.log('........----------', menus.menus.rows)
            setMenu(menus.menus.rows)
            console.log(menu)
        })

     },[])

    return (
        <>
        <NavBar />
        
        <div className='menu-body'> 
        <div className="menu-zone">
        <div className="menu-space">
            <h1>MENU</h1>
            <div className="categorie-menu-space">
                <p>TOUT</p>
                {allCategories.map((categorie) =>{
                    return (
                        <>
                        <p onClick={()=>{showMenuCategorie(categorie.id)}} >{categorie.nom}</p>
                        </>
                    )
                })}
            </div>
        </div>
        
        <div className="ls-menu">
            
            {menuCat.map(menu => {
                return (
                    <>
                     <div className="menu-space">
                <div className="img-menu">
                    <img src={photo} alt="" />
                </div>
                <div className="info-menu">
                    <p>{menu.nom}</p>
                    <p>{menu.categories}</p>
                    <p>{menu.prix} CFA</p>
                </div>
            </div>
                    </>
                )
            })}

        </div>

        </div>
        
           
        </div>




        <Footer />
        </>
        
    );
}

export default Menu;