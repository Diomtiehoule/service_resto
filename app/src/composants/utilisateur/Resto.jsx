import React ,{useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import url_api from '../../api/api';
import { get_cookie } from '../../cookie/cookie';
import './resto.css'
import NavBar from './NavBar';
import Footer from '../restaurant/Footer';
import photo from '../../media/resto1.jpeg'
import CodeQR from '../restaurant/CodeQR';

function Resto() {

    const cookie = get_cookie('cookie_service_resto')
    const { id } = useParams()
    console.log(id)
    const [ resto , setResto ] = useState({})
    const stat = document.querySelector('.status')
    if(resto.status == 1){
        stat.style.color = 'green'
        stat.style.fontWeight = 'bold'
    }else if(resto.status == 0){
        stat.textContent = 'Fermé'
        stat.style.color = 'red'
        stat.style.fontWeight = 'bold'
    }
    

    const [ allCategorie , setAllCategories] = useState([])
    const stat_cat = document.querySelector('.categorie-resto')

    


    useEffect(()=>{
        if(!cookie){
            fetch(url_api+`restaurant/${id}` , {
                method : 'GET'
            })
            .then(res => res.json())
            .then(resto =>{
                console.log('........' , resto.restaurant)
                setResto(resto.restaurant)

                fetch(url_api+`categorie/${id}` ,{
                    method : 'GET'
                })
                .then(res => res.json())
                .then(categories =>{
                    if(categories){
                        console.log('-----------' , categories.categorie.rows)
                        setAllCategories(categories.categorie.rows)
                    }
                    console.log('succes fetch')
                })
            })
        }else{
            fetch(url_api+`restaurant/${id}` , {
                method : 'GET'
            })
            .then(res => res.json())
            .then(resto =>{
                console.log('........' , resto.restaurant)
                setResto(resto.restaurant)
                
                fetch(url_api+`categorie/${id}` ,{
                    method : 'GET'
                })
                .then(res => res.json())
                .then(categories =>{
                    if(categories){
                        console.log('-----------' , categories.categorie.rows)
                        setAllCategories(categories.categorie.rows)
                    }
                    
                    console.log('succes fetch')
                })

            })
            
        }
       
    },[])

    for(let i = 0 ; i < allCategorie.length ; i++){
        if(allCategorie[i].status == 1  ){
            console.log(allCategorie[i].nom)
        }
       
    }
   

    return (
        <>
         <NavBar />
        <div className='resto-zone'>

            <div className="main-img-resto">
                <div className="nom-resto">
                    <h1>{resto.nom}</h1>
                </div>
                <img src={photo} alt="" />
                <div className="info-resto">
                    <p>{resto.commune}, abidjan </p>
                    <p><i class="fa-solid fa-location-dot"></i> {resto.localisation}</p>
                </div>
            </div>

            <div className="qrcode-menu">
                <h2>MENU</h2>
                <div className="qrcode-space">
                    <CodeQR/>
                </div>
            </div>

            <div className="other-detail-resto">
                <div className="detail">
                <p>Contact : +225 {resto.contact}</p>
                </div>

                <div className="detail">
                    <p >Status : <span className='status'> Ouvert</span></p>
                </div>

                <div className="detail">
                    <h2>CATEGORIES</h2>
                    {allCategorie.map(categorie =>{
                        return(
                            <>
                            <p className='categorie-resto'><i class="fa-solid fa-check"></i> {categorie.nom}</p>
                            </>
                        )
                    })}
                    {/* <p>burger</p>
                    <p>sauce africaine</p>
                    <p>pizza</p>
                    <p>occidental</p> */}
                </div>
            </div>

            <div className="suggestion-restos">

            </div>

        </div>
        <Footer />
        </>
        
    );
}

export default Resto;