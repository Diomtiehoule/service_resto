import React , {useState , useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import url_api from '../../api/api';
import { get_cookie } from '../../cookie/cookie';
import './gestion.css'
import NavBar from './NavBar';
import photo from '../../media/menu.jpg'
import Footer from './Footer';
import Pagination from './Pagination';
import CodeQR from './CodeQR';


function Gestion() {

    const [ modal , setModal ] =useState(false)
    const [ modalMenu , setModalMenu ] = useState(false)
    const [ nom , setNom ] = useState('')
    const [ description , setDescription ] = useState('')
    const [ prix , setPrix ] = useState(0)
    const [ category , setCategory ] = useState('')
    const [ status , setStatus ] = useState(1)
	const toggleModal = ()=>{
		setModal(!modal)
	}
    const toggleModalMenu = ()=>{
        setModalMenu(!modalMenu)
    }

    let navigate = useNavigate()

    const [ resto , setResto ] = useState([])

    const cookie = get_cookie('cookie_service_resto')
            if(!cookie) navigate('/login')
            console.log(cookie)


            const handleAdd = (e) =>{
                if(nom == '' || description ==''){
                    console.log('veuillez remplir tout les champs')
                }else{
                    fetch(url_api+"categorie/add" , {
                        method : "POST" ,
                        body : new URLSearchParams({nom , description , status}),
                        headers : { Authorization :  cookie}
                    })
                    .then(res => res.json())
                    .then(success => {
                        console.log('............' , success)
                        setDescription('')
                        setNom('')
                        setTimeout(() => {
                            setModal(!modal)
                            window.location.reload()
                        }, 2000);
                        
                        
                    })
                    .catch(error =>{
                        console.log(error)
                    })
                }
                
            }

            const  addMenu = event =>{
                fetch(url_api+"menu/add" , {
                    method : 'POST',
                    body : new URLSearchParams({nom , description , prix , category , status}),
                    headers : {Authorization : cookie}
                })
                .then(res => res.json())
                .then(success =>{
                    console.log('...........', success)
                    setCategory('')
                    setDescription('')
                    setNom('')
                    setPrix('')
                    setTimeout(() => {
                        setModalMenu(!modalMenu)
                    }, 1000);
                })
            }

            const [ allCategories , setAllCategories ] = useState([])
            const [ allMenu , setAllMenu ] = useState([])
            console.log(allMenu)
            console.log(allCategories)

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
                console.log('*************' , success , success.myCategorie.rows)
                setAllCategories(success.myCategorie.rows)
                console.log(allCategories)
            })

            fetch(url_api+'menu/all' ,{
                method : "GET",
                headers : {Authorization : cookie}
            })
            .then(res => res.json())
            .then(success =>{
                console.log('----------', success.allMenu.rows)
                setAllMenu(success.allMenu.rows)
                console.log(allMenu)
            })
        })
        .catch(error =>{
            console.log(error)
        })

     },[])


    

      //  code pagination 
    const [currentPage , setCurrentPage] = useState(1)
    const [ recordPerPage , setRecordPerPage ] = useState(8)

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage
    const currentRecords = allMenu.slice(indexOfFirstRecord,indexOfLastRecord)
    const nPage = Math.ceil(allMenu.length / recordPerPage)
    
    return (
        <>
        <NavBar/>
        <div className='gestion_body'>

            {/* <div className="category_space">
                <div className="first_part">
                <h1>Categories</h1><div className="border"></div>
                </div>

                <div className="ls_categories">

                     <div className="container">
                     {allCategories.map(categorie => {
                        return(
                            <>
                            <div className="profil_wrapper">
                                        <div className="profil_imag_wrapper">
                                            <img className='profil_imag' src={photo} alt="" />
                                        </div>
                                        <h4>{categorie.nom}</h4>
                                    </div>
                            </>
                        )
                    })}
                       
                     </div>
                </div>
                <div className="add_categories">
                    <button onClick={toggleModal}>Ajouter un categorie</button>
                </div>
                
            </div>

            <div className="menu_zone">
                <div className="ls_menu">
                    <h1>Menu</h1><div className="border"></div>
                </div>
            
            <div className="menu_space">
                <div className="container_menu">
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                    <div className="card">
                        <div className="imag_card">
                            <img src={photo} alt="" />
                        </div>
                        <p>Nom du menu</p>
                        <p>Description</p>
                        <p>Prix</p>
                    </div>
                </div>
            </div>
            <div className="add_menu">
                <button onClick={toggleModalMenu}>Ajouter un menu</button>
            </div>
            
            </div> */}
            <div className="gestion_part">

                <div className="gestion_menu_part">

                   <div className="menu_space">

                    <div className="title">
                        <h3>MENU</h3>
                    </div>
                    <div className="btn_add_menu">
                        <button  onClick={toggleModalMenu}>Ajouter un menu</button>
                    </div>
                   </div>

                   <div className="gestion_ls_menu">

                   
                    {allMenu.map((menu) =>{
                        return (
                            <>
                            <div className="menu" key={menu.id}>
                        <div className="img_menu">
                            <img src={photo} alt="" />
                        </div>
                        <div className="menu_info">
                            <p>{menu.nom}</p>
                            <p>{menu.category}</p>
                            <p>{menu.prix}</p>
                        </div>
                        <div className="action_menu">
                        <p><i class="fa-solid fa-pen-to-square"></i></p>
                        <p><i class="fa-solid fa-trash"></i></p>
                        </div>
                    </div>
                            </>
                        )
                    }).slice(indexOfFirstRecord,indexOfLastRecord)}
                    
                    
                    
                   </div>
                   <Pagination
                        nPage={nPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <div className="gestion_categorie_part">
                    <div className="btn_add_categorie">
                        <button onClick={toggleModal}><i class="fa-solid fa-plus"></i> Ajouter catégorie</button>
                    </div>
                    <div className="gestion_ls_categorie">

                        {allCategories.map(categorie =>{
                            return (
                                <>
                                    <div className="element_categorie">
                                    <p>{categorie.nom}</p>
                                    <div className="action_categorie">
                                        <div className="btn_edit_categorie">
                                            <p><i class="fa-solid fa-pen-to-square"></i></p>
                                        </div>
                                        <div className="btn_delete_categorie">
                                            <p><i class="fa-solid fa-trash"></i></p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                        })}
                    </div>
                    <div className="code_qr_space">
                    <CodeQR />
                    {/* <p>Code QR du restaurant</p> */}
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
							<span className="modal__title">Nouvelle categorie</span><button className="button button--icon" onClick={toggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' name='nom' onChange={(e)=>{setNom(e.target.value)}} value={nom}/> 
								<p className="input__description">message erreur</p>
							</div>
                            <div className="input">
								<label className="input__label">Description categorie</label>
								<input className="input__field" type="text" key='' name='description' onChange={(e)=>{setDescription(e.target.value)}} value={description}/> 
								<p className="input__description">message erreur</p>
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={handleAdd}>Ajouter la catégorie</button>
						</div>
					</div>
				</div>
				</div>
			)}
        
        { modalMenu && (
				
				<div className="modal">
				<div className="overlay" onClick={toggleModalMenu}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Nouveau menu</span><button className="button button--icon" onClick={toggleModalMenu}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Nom du menu</label>
								<input className="input__field" type="text" name='nom' key='' value={nom} onChange={(e)=>{setNom(e.target.value)}} required/> 
								<p className="input__description"></p>
							</div>
							<div className="input">
												<label className="input__label">Description</label>
								<textarea className="input__field " name='description' value={description} onChange={(e)=>{setDescription(e.target.value)}} required></textarea>
									
							</div>

							<div className="input">
								<label className="input__label">Prix</label>
								<input className="input__field" type="number" name='prix' placeholder='CFA' value={prix} onChange={(e)=>{setPrix(e.target.value)}} required/> 
								
							</div>

                            <div className="input">
								<label className="input__label">Categorie</label>
								<input className="input__field" type="text"  name='category' value={category} onChange={(e)=>{setCategory(e.target.value)}} required/> 
								
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={addMenu}>Ajouter menu</button>
						</div>
					</div>
				</div>
				</div>
			)}
            <Footer/>
        </>
    );
}

export default Gestion;