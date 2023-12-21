import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import url_api from '../../api/api.jsx';
import NavBar from './NavBar.jsx';
import './allResto.css'
import photo from '../../media/home1.webp'
import axios from 'axios'
import Footer from '../restaurant/Footer.jsx';

function AllResto() {

    const navigate = useNavigate()

    const [ modal , setModal ] =useState(false)
	const toggleModal = ()=>{
		setModal(!modal)
	}

  const [modalLogOut , setModalLogOut] = useState(false)

    const toggleLogOut = () =>{
        setModalLogOut(!modal)
        console.log('ouvert')
    }
    const closeToggle = () =>{
        setModalLogOut(modal)
        console.log('fermé')
    }

    const [ restos , setResto ] = useState([])

    useEffect(()=>{
        fetch(url_api+'restaurant/all' , { method : 'GET'})
        .then(res => res.json())
        .then(data =>{
            console.log('***********' , data.resto.rows)
            setResto(data.resto.rows)
        })
    },[])
    

    console.log(restos)
    return (

        <div className='body_allResto'>
            <NavBar/>
            

        <div className="allResto_part">
            <div className="zone_allResto">
                <div className="all">
                <h3>Tout</h3>
                </div>

                <div className="ls_zone">
                    {/* {restos.map((resto) =>{
                        return(
                            <>
                            <div className="zone">
                            <p>Cocody</p>
                        </div>
                            </>
                        )
                    })} */}
                    
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                    <div className="zone">
                        <p>Cocody</p>
                    </div>
                </div>
            </div>

            <div className="ls_restos">
                 { restos.map(res =>{
                return(
                    <>

                    <div className="restaurant" onClick={()=> navigate(`/restaurant/${res.id}`)}>
                        <div className="image_resto">
                            <img src={photo} alt="" />
                        </div>
                        <div className="detail_resto">
                            <h2 className='nom_resto'>{res.nom}</h2>
                            <p> {res.commune} , Abidjan</p>
                            <p><i class="fa-solid fa-location-dot"></i>  {res.location}</p>
                            <p><i class="fa-solid fa-phone"></i> : {res.contact}</p>
                        </div>

                        
                    </div>
            
                    </>
                )
            })}
            
            </div>
        </div>


            {modal && (<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Menu</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
                            <p>Faite scanner ce code QR pour avoir accès aux menus du restaurant</p>
						</div>
                        <div className="QRcode" key={restos.id}>
                            <img src={restos.img_code_qr} alt="" />
                        </div>
						
					</div>
				</div>
				</div>)}

           

            <Footer/>
           </div>
           
    );
}

export default AllResto;