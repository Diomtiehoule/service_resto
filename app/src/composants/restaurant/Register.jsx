import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import url_api from '../../api/api';
import "./register.css"

function Register() {

    const navigate = useNavigate()
   
    const [ nom , setNom ] = useState('')
    const [ location , setLocation ] = useState('')
    const [commune , setCommune ] = useState('')
    const [ contact , setContact] = useState('')
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [ status , setStatus ] = useState(1)


    const handlSubmit = async (e) =>{
        e.preventDefault()
        try {
            if(nom == "" || location == '' || commune == '' || contact == '' || email =='' || password ==""){
                console.log("veuillez remplir tout les champs svp !")
            }else if(password.length <6){
                console.log("le mot de passe doit être supéreur à 6 !!")
            }else if(contact.length > 10){
                console.log("le numero de telephone doit contenir  10 chiffres !")
            }else{
                console.log('essai')
                fetch(url_api+'restaurant/register' ,{
                    method : "POST",
                    body : new URLSearchParams({nom , location , commune , contact , email , password , status})
                })
                .then(res => res.json())
                .then(success => {
                    console.log("----------inscription éffectuée" , success)
                    setCommune('')
                    setContact('')
                    setEmail('')
                    setNom('')
                    setLocation('')
                    setPassword('')
                    setTimeout(()=>{
                        navigate("/login")
                    },2000);
                })
                .catch(error =>{
                    console.log("----------echec de l'inscription" , error)
                })}
            
        } catch (error) {
            console.log(error.message)
        }
    };
    
    return (
        <div className='register_body'>
             <div className="register_space">
                <div className="register_form">
                    <form action="" onSubmit={handlSubmit}>
                    {/* <h1 className='title'><span>La</span> Carte</h1> */}
                    <h1>Enregistrement</h1>
                        <div className="inputs">
                            {/* <label htmlFor="">Nom du restaurant</label><br /> */}
                            <input type="text" placeholder='Restaurant' name="nom" value ={nom} onChange={(e)=>{setNom(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Commune</label><br /> */}
                            <input type="text" placeholder='Commune' name='commune' value ={commune}  onChange={(e)=>{setCommune(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Location</label><br /> */}
                            <input type="text" placeholder='Location' name='location' value={location}  onChange={(e)=>{setLocation(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Contact</label><br /> */}
                            <input type="tel" placeholder='Contact' name='contact' value={contact}  onChange={(e)=>{setContact(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Adresse email</label><br /> */}
                            <input type="email" placeholder='Email' name='email' value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Mot de passe</label><br /> */}
                            <input type="password" placeholder='Mot de passe' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <button>Valider</button>

                        <div className="login_part">
                            <p>Vous avez déjà un compte ?<Link to={"/login"}>  Connectez-vous</Link></p>
                        </div>
                    </form>
                </div>
             </div>
        </div>
    );
}

export default Register;