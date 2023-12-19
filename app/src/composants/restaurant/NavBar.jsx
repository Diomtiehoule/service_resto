import React ,{useEffect} from 'react';
import {useParams , Link , useNavigate  , useLocation} from 'react-router-dom';
import './navbar.css'

function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location.pathname)
    const url = window.location.pathname
    console.log(url)
    
    useEffect(()=>{
        if(location.pathname == "/profil"){
            const profil = document.querySelector('.link-profil')    
            profil.style.color = "rgb(201,0,0)"
        }else  if(url == "/restaurant"){
            const resto = document.querySelector('.link-resto')
            resto.style.color ="rgb(201,0,0)" 
        }else if(url == "/gestion"){
            const gestion = document.querySelector('.link-gestion')
            gestion.style.color ="rgb(201,0,0)" 
        }
    },[])
    
    return (
        <div className='navbar_resto'>
            <nav>
                <Link to={'/'}><h1>La<span>Carte</span></h1></Link>
                <ul>
                    <li className='effect_restaurant'><Link to={'/restaurant'} className='link-resto'>Restaurant</Link></li>
                    <li className='effect_gestion'><Link to={'/gestion'} className='link-gestion'>Gestion</Link></li>
                    <li className='effect_profil'><Link to={'/profil'} className='link-profil'>Profil</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;