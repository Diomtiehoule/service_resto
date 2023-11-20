import React, { useState , useEffect} from 'react';
import url_api from '../../api/api.jsx';
import NavBar from './NavBar.jsx';
import './allResto.css'
import photo from '../../media/home1.webp'
import axios from 'axios'

function AllResto() {

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
        const fetchData = async () =>{
            const { data }= await axios.get(url_api+"/api/restaurant/all")
            setResto(data.resto.rows)
            console.log(data)
        }
        fetchData()
    },[])
    

    console.log(restos)
    return (

        <div className='body_allResto'>
            <NavBar/>

            <h1>Nos Restaurants</h1>
            <div className="border"></div>
            <div className="body_information">
                <p>Retrouvez la liste de tout nos restaurant de la ville , trouvez la terrasse a votre gout puis devcouvrez les menu de celui-ci</p>
                <button onClick={toggleModal}>click</button>
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

            {/* <div className="input">
								<label className="input__label">Nom de la team</label>
								<input className="input__field" type="text"/> 
								<p className="input__description"></p>
							</div>

              <div className="input">
								<label className="input__label">Membres de la team</label>
								<input className="input__field" type="text"/> 
								<p className="input__description"></p>
							</div>

              <div className="input">
								<label className="input__label">Canal/canaux de diffusion</label>
								<input className="input__field" type="text"/> 
								<p className="input__description"></p>
							</div> */}
							
						</div>
                        <div className="QRcode">
                            <img src={code} alt="" />
                        </div>
						
						{/* <div className="modal__footer">
							<button className="button button--primary close-modal" >Créer la diffusion</button>
						</div> */}
					</div>
				</div>
				</div>)}

            { restos.map(res =>{
                return(
                    <>
                    <div className="listResto">

                    <div className="restaurant">
                        <div className="image_resto">
                            <img src={photo} alt="" />
                        </div>
                        <div className="detail_resto">
                            <p className='nom_resto'>{res.nom}</p>
                            <p> {res.commune},Abidjan</p>
                            
                        </div>
                        
                    </div>
                    
                    </div>  
                    
                    {/* <p>le nom du resto : </p>
                    <p>le localisation du resto : {res.location}</p>
                    <p>le contact du resto : {res.contact}</p>
                    <p>le commune du resto :</p> */}
                    </>
                )
            })}

            
           </div>
    );
}

export default AllResto;