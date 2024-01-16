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
    const [editModal , setEditModal ] = useState(false)
    const [editModalMenu , setEditModalMenu] = useState(false)
    const [ nom , setNom ] = useState('')
    const [ description , setDescription ] = useState('')
    const [ prix , setPrix ] = useState(0)
    const [ categories , setCategories ] = useState('')
    const [ status , setStatus ] = useState(1)
	const toggleModal = ()=>{
		setModal(!modal)
	}
    const toggleModalMenu = ()=>{
        setModalMenu(!modalMenu)
    }
    const editToggleModal = (id) =>{
        console.log("l'id a modifier" , id)
        setEditModal(!editModal)
    }
    const editToggleModalMenu = () =>{
        setEditModalMenu(!editModalMenu)
    }
    let navigate = useNavigate()

    const [ resto , setResto ] = useState([])

    const cookie = get_cookie('cookie_service_resto')
            if(!cookie) navigate('/login')
            console.log(cookie)


            const handleAdd = (e) =>{
                if(nom == ''){
                    console.log('veuillez le champs')
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
                    body : new URLSearchParams({nom , description , prix , categories , status}),
                    headers : {Authorization : cookie}
                })
                .then(res => res.json())
                .then(success =>{
                    console.log('...........', success)
                    setCategories('')
                    setDescription('')
                    setNom('')
                    setPrix('')
                    setTimeout(() => {
                        setModalMenu(!modalMenu)
                        window.location.reload()
                    }, 1000);
                })
            }

            var menu_zone = document.querySelector('.gestion_ls_menu')
            var pagin = document.querySelector('.pagination_body')
            var txt = document.querySelector('.text_menu')
            const [ allCategories , setAllCategories ] = useState([])
            const [ allMenu , setAllMenu ] = useState([])
            console.log(allMenu.length)
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
                //     if(allMenu.length > 0){
                //     console.log('aucun element')
                //     console.log('superieur')
                //     txt.style.display = 'none'
                //     menu_zone.style.display = 'flex'
                //     pagin.style.display = "block"
                // }
                // if(allMenu.length < 1){
                //     console.log('aucun element')
                //     console.log('inferieur')
                //     txt.style.display = 'block'
                //         menu_zone.style.display = 'none'
                //         pagin.style.display = "none"
                // }
            })
        })
        .catch(error =>{
            console.log(error)
        })

     },[])


    

      //  code pagination 
    const [ currentPage , setCurrentPage] = useState(1)
    const recordPerPage = 8;
    const lastIndex = currentPage * recordPerPage
    const firstIndex = lastIndex - recordPerPage
    const records = allMenu.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(allMenu.length / recordPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)
    const prevPage = () =>{
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changePage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if(currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }


    const deleteCategorie = (id) =>{
        console.log("notre id...",id)
        fetch(url_api+`categorie/${id}` , {
         method : 'DELETE',
         headers : {Authorization : cookie}
        })
        .then(res => res.json())
        .then(success => {
            console.log('mise a jour avec success !!' , success)
            window.location.reload()
        })
    }

    const deleteMenu = (id) =>{
        console.log("notre id...",id)
        fetch(url_api+`menu/${id}` , {
         method : 'DELETE',
         headers : {Authorization : cookie}
        })
        .then(res => res.json())
        .then(success => {
            console.log('supprimé avec success !!' , success)
            window.location.reload()
        })
    }

    const editCategorie = (id) =>{
        console.log("notre id...", id)
        fetch(url_api+`categorie/${id}` , {
            method : 'PUT',
            headers : {Authorization : cookie},
            body : new URLSearchParams({nom , description})
        })
        .then(res => res.json())
        .then(success =>{
            console.log("categorie mise a jour" , success)
        })
    }

    

    
    return (
        <>
        <NavBar/>
        <div className='gestion_body'>
            <div className="gestion_part">

                <div className="gestion_menu_part" >

                   <div className="menu_space">

                    <div className="title">
                        <h3>MENU</h3>
                    </div>
                    <div className="btn_add_menu">
                        <button  onClick={toggleModalMenu}>Ajouter un menu</button>
                    </div>
                   </div>

                    <div className="text_menu" style={{display : 'none'}}>
                        <p>Vous n'avez aucun menu enregistré</p>
                    </div>
                   <div className="gestion_ls_menu">

                   
                    {records.map((menu , i) =>{
                        return (
                            <>
                            <div className="menu" key={i}>
                        <div className="img_menu">
                            <img src={photo} alt="" />
                        </div>
                        <div className="menu_info">
                            <p>{menu.nom}</p>
                            <p>{menu.categories}</p>
                            <p>{menu.prix} CFA</p>
                        </div>
                        <div className="action_menu">
                        <p onClick={editToggleModalMenu}><i class="fa-solid fa-pen-to-square"></i></p>
                        <p onClick={()=>{deleteMenu(menu.id)}}><i class="fa-solid fa-trash"></i></p>
                        </div>
                    </div>
                            </>
                        )
                    })}

                   </div>
                   <div className='pagination_body'>
            <nav>
                <ul className="pagination">
                    <li className='page-item'>
                        <a className='page-link prev' onClick={prevPage} href="#">Precedent</a>
                    </li>
                {numbers.map((n , i) => (
                    <li key={i} className={`page-item ${currentPage == n ? 'actif' : ''}`}>

                        <a href='#' onClick={() => changePage(n)} className='page-lien'>{n}</a>

                    </li>
                ))}

                <li className='page-item'>
                    <a className='page-link next' onClick={nextPage} href="#">Suivant</a>
                </li>
                </ul>
            </nav>
                    </div>


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
                                        {/* <div className="btn_edit_categorie" onClick={()=>{editToggleModal(categorie.id)}}>
                                            <p><i class="fa-solid fa-pen-to-square"></i></p>
                                        </div> */}
                                        <div className="btn_delete_categorie">
                                            <p onClick={()=>{deleteCategorie(categorie.id)}}><i class="fa-solid fa-trash"></i>
                                        </p>

                                        </div>
                                    </div>
                                </div>
                            </>
                            )
                        })}
                    </div>
                    <div className="code_qr_space">
                    <CodeQR />
                    </div>
                    
                </div>
            </div>
        </div>

        { editModal && (
				
				<div className="modal">
				<div className="overlay" onClick={editToggleModal}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Mise à jours categorie</span><button className="button button--icon" onClick={editToggleModal}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
									<path fill="none" d="M0 0h24v24H0V0z"></path>
									<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path></svg></button>
						</div>
						<div className="modal__body">
							<div className="input">
								<label className="input__label">Nom de la categorie</label>
								<input className="input__field" type="text" key='' name='nom' onChange={(e)=>{setNom(e.target.value)}} value={nom}/> 
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={() =>{editCategorie()}}>Mettre à jours</button>
						</div>
					</div>
				</div>
				</div>
			)}

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
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" onClick={handleAdd}>Ajouter la catégorie</button>
						</div>
					</div>
				</div>
				</div>
			)}
        
        { editModalMenu && (
				
				<div className="modal">
				<div className="overlay" onClick={editToggleModalMenu}></div>
							<div className="container-projet">
					
					<div className="modal-content container-projet">
						<div className="modal__header">
							<span className="modal__title">Mise à jours du menu</span><button className="button button--icon" onClick={editToggleModalMenu}><svg width="24" viewBox="0 0 24 24" height="24" xmlns="http://www.w3.org/2000/svg">
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
								<input className="input__field" type="text"  name='categories' value={categories} onChange={(e)=>{setCategories(e.target.value)}} required/> 
								
							</div>
							
						</div>
						
						<div className="modal__footer">
							<button className="button button--primary close-modal" >Mettre à jours menu</button>
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
								<input className="input__field" type="text"  name='categories' value={categories} onChange={(e)=>{setCategories(e.target.value)}} required/> 
								
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