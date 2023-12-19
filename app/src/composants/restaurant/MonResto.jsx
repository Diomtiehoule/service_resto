import React, { useEffect, useState } from 'react';
import './monResto.css'
import photo from '../../media/home.jpg'
import Footer from './Footer';
import NavBar from './NavBar';
import { get_cookie } from '../../cookie/cookie';
import axios from 'axios';
import url_api from '../../api/api';
import { useNavigate } from 'react-router-dom';

function MonResto() {

    let navigate = useNavigate()

    

    const [ resto , setResto ] = useState([])

    const cookie = get_cookie('cookie_service_resto')
            if(!cookie) navigate('/login')
            console.log(cookie)

     useEffect( ()=>{

        fetch(url_api+"restaurant/getRestaurant" , {
            method : 'GET' ,
            headers : { Authorization : cookie} ,
        },)
        .then(res => res.json())
        .then(success =>{
            console.log('.......................' , cookie , success)
            setResto(success.restaurant)
            console.log(resto)
        })
        .catch(error =>{
            console.log(error)
        })
        // const fetchResto = async() =>{

        //     const cookie = get_cookie('cookie_service_resto')
        //     console.log(cookie)
        //     if(!cookie){
        //         navigate('/login')
        //     }
        //     const { data } = axios.get(url_api+'restaurant/getRestaurant'  , { withCredentials : false } , { headers : {"Authorization" : `Bearer ${cookie}`}})
        //     .then(success =>{
        //         console.log(success)
        //     })
        //     .catch(err =>{
        //         console.log(err)
        //     })
        // }
        // fetchResto()

        
     },[])
    return (
        <>
        <NavBar />
        <div className='resto_body'>
            <div className="main_image_resto">
                <img src={photo} alt="" />
                <div className="information_resto">
                    <p> {resto.nom}, {resto.commune}  , abidjan</p>
                    <p>{resto.location}</p>
                    <p><i class="fa fa-solid fa fa-phone"></i> : +225 {resto.contact}</p>
                    <p><i class="fa fa-solid fa-envelope"></i> : {resto.email}</p>
                </div>
            </div>

            <div className="information_principales">
                <div className="category_other">
                    <h3>Liste de vos catégories</h3>
                    <div className="border_category"></div>
                    <p>burger</p>
                    <p>pizza</p>
                    <p>boulangerie</p>
                    <p>sauce africaine</p>
                    <p>occidental</p>
                </div>
                <div className="ls_menu">
                    <div className="listes">
                        <p>Menu</p>
                    </div>
                <div className="menu_resto">
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>
                    <div className="menu">
                        <img src={photo} alt="" />
                        <div className="info_menu">
                            <p>Nom menu</p>
                            <p>Description menu</p>
                            <p>prix menu</p>
                        </div>
                        <button className='btn_view'>Voir menu</button>
                    </div>  
                </div>
                <div className="ls_more">
                    <p>Voir plus</p>
                </div>
                </div>
            </div>

            
        </div>
        <Footer />
        </>
    );
}

export default MonResto;