import React , {useState , useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import url_api from '../../api/api';
import { destroy, get_cookie } from '../../cookie/cookie';
import './profil.css'
import NavBar from './NavBar';
import Footer from './Footer';
import photo from '../../media/home.jpg'

function Profil() {
    
    let navigate = useNavigate()


    const cookie = get_cookie('cookie_service_resto')
            if(!cookie) navigate('/login')
            console.log(cookie)

    const [ modal , setModal ] =useState(false)
	const toggleModal = ()=>{
		setModal(!modal)
	}


    const [ resto , setResto ] = useState([])
    const [ allCategories , setAllCategories ] = useState([])
    const [ allMenu , setAllMenus ] = useState([])

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

            fetch(url_api+'categorie/all' ,{
                method : "GET",
                headers : {Authorization : cookie}
            })
            .then(res => res.json())
            .then(success =>{
                console.log('*************' , success , success.myCategorie.count)
                setAllCategories(success.myCategorie.count)
                console.log(allCategories)
            })

            fetch(url_api+'menu/all' ,{
                method : "GET",
                headers : {Authorization : cookie}
            })
            .then(res => res.json())
            .then(success =>{
                console.log('*************' , success , success.allMenu.count)
                setAllMenus(success.allMenu.count)
                console.log(allMenu)
            })
        })
        .catch(error =>{
            console.log(error)
        })
        
     },[])


    const [ nom , setNom ] = useState('')
    const [contact , setContact ] = useState('')
    const [commune , setCommune ] = useState('')
    const [ location , setLocation ] = useState('')

     const handleEdit = (e) =>{
        if(nom =='' || commune=='' || contact=='' || location==''){
            console.log('veuillez remplir tout les champs !!')
        }
        fetch(url_api+"restaurant/edit" , {
            method : "PUT",
            body : new URLSearchParams({nom , contact , commune , location}),
            headers : {Authorization : cookie}
        })
        .then(res => res.json())
        .then(success =>{
            console.log('..............' , success)
            console.log(nom , contact , location , commune)
            setNom('')
            setCommune('')
            setContact('')
            setLocation('')
        })
     }

     const handlLogOut = ()=> {
        setTimeout(() => {
            destroy("cookie_service_resto")
            console.log('Déconnection !!')
        }, 2000);
    };


    let btn_off = document.querySelector('.button_off')
    let status = document.querySelector('.p_status')
    if(resto.status == 1){
        btn_off.style.backgroundColor = "rgb(201,0,0)"
        btn_off.textContent = 'Désactiver le compte'
        status.textContent = 'Ouvert'
    }else if (resto.status == 0){
        btn_off.style.backgroundColor = "rgb(9, 216, 19)"
        btn_off.textContent = 'Activer le compte'
        btn_off.style.border = '1px solid rgb(9, 216, 19)'
        status.textContent = 'Fermé'
    }
    const countOff = (e) =>{
        if(resto.status == 1){
            fetch(url_api+"restaurant/delete" ,{
                method : "PUT",
                headers : {Authorization : cookie}
            })
            .then(res => res.json())
            .then(off =>{
                console.log('votre compte a été desactivé avec succès !')
                window.location.reload()
            })
        }else if(resto.status == 0){
            fetch(url_api+"restaurant/active" , {
                method : "PUT",
                headers : {Authorization : cookie}
            })
            .then(res => res.json())
            .then(on =>{
                console.log("Votre compte a été activé avec succès !")
                window.location.reload()
            })
        }
   }

    return (
        <>
        <NavBar/>
        <div className="profil_space">
        <div className='profil_zone'>
            <div className="info_principal_profil">
                <div className="zone_image_profil">
                    <div className="image_profil">
                    <img src={photo} alt="" />
                    </div>
                    <p>{resto.nom}</p>
                    <p>{resto.commune}</p>
                    
                </div>
                <div className="zone_info">
                    <div className="info">
                        <p>Categories</p>
                        <p>{allCategories}</p>
                    </div>

                    <div className="info">
                        <p>Menu</p>
                        <p>{allMenu}</p>
                    </div>

                    <div className="info">
                        <p>Status</p>
                        <p className='p_status'>15</p>
                    </div>
                </div>
                <div className="zone_logout">
                    <button className="button_logout" onClick={handlLogOut}>Déconnexion</button><br />
                    <button className="button_off" onClick={countOff}>Désactiver le compte</button>
                </div>
            </div>


            <div className="info_secondaire_profil">
                <div className="account_info">
                    <h1>Information du compte</h1>
                </div>
                <div className="ls_fields">

                <div className="doubl_field">
                <div className="field">
                    <label htmlFor="">Nom du restaurant</label>
                    <div className="info">
                        <p>{resto.nom}</p>
                    </div>
                </div>
                
                <div className="field">
                    <label htmlFor="">ID</label>
                    <div className="info">
                        <p>{resto.id}</p>
                    </div>
                </div>

                
                </div>
                

                <div className="doubl_field">
                <div className="field">
                    <label htmlFor="">Téléphone</label>
                    <div className="info">
                        <p>+225 {resto.contact}</p>
                    </div>
                </div>
                
                <div className="field">
                    <label htmlFor="">Adresse mail</label>
                    <div className="info">
                        <p>{resto.email}</p>
                    </div>
                </div>
                </div>
                

                <div className="doubl_field">
                <div className="field">
                    <label htmlFor="">Commune</label>
                    <div className="info">
                        <p>{resto.commune}</p>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="">Localisation</label>
                    <div className="info">
                        <p>{resto.location}</p>
                    </div>
                </div>
                </div>
                

                <div className="doubl_field">
                <div className="field">
                    <label htmlFor="">Ville</label>
                    <div className="info">
                        <p>Abidjan</p>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="">Pays</label>
                    <div className="info">
                        <p>Cote d'ivoire</p>
                    </div>
                </div>

                
                </div>
                


                </div>

                <div className="edit_info_secondaire">
                    <button onClick={toggleModal}>Modifier</button>
                </div>
            </div>
        </div>
        </div>

        { modal && (
				
				<div className="modal">
				<div className="overlay" onClick={toggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Mise à jours</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
                        <div className="ls_fields">

                            <div className="doubl_field">
                            <div className="field">
                                <label htmlFor="">Nom du restaurant</label><br />
                                <input type="text" placeholder='Restaurant' name='nom'  value={nom} onChange={(e)=>{ setNom(e.target.value)}}/>
                            </div>

                            <div className="field">
                                <label htmlFor="">Téléphone</label><br />
                                <input type="number" placeholder='+225' name='contact' onChange={(e)=>{setContact(e.target.value)}} value={contact}/>
                            </div>

                            </div>

                            <div className="doubl_field">
                            <div className="field">
                                <label htmlFor="">Commune</label><br />
                                <input type="text" placeholder='commune' name='commune' onChange={(e)=>{setCommune(e.target.value)}} value={commune}/>
                            </div>

                            <div className="field">
                                <label htmlFor="">Localisation</label><br />
                                <input type="text" placeholder='Localisation' name='location' onChange={(e)=>{setLocation(e.target.value)}} value={location}/>
                            </div>
                            </div>





                            </div>
							{/* <div className="input">
								<label className="input__label">Nom du restaurant</label>
								<input className="input__field" type="text" key='' />
							</div>
                            <div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' />
							</div>
                            <div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' />
							</div>
                            <div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' />
							</div>
                            <div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' />
							</div> */}
							{/* <div className="input">
												<label className="input__label">Description</label>
								<textarea className="input__field input__field--textarea" ></textarea>
									<p className="input__description">Donnez la description la plus claire possible de votre projet.</p>
							</div> */}

							{/* <div className="input">
								<label className="input__label">Fond d'investissement</label>
								<input className="input__field" type="number"  placeholder='CFA' /> 
								<p className="input__description">Donnez le  fond nécéssaire au projet</p>
							</div> */}
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={handleEdit}>mettre à jours</button>
						</div>
					</div>
				</div>
				</div>
			)}
        
        <Footer/>
        </>
    );
}

export default Profil;