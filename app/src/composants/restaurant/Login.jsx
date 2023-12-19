import React , { useEffect , useState }from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import url_api from '../../api/api';
import { Link } from 'react-router-dom';
import "./login.css"
import { save_cookie , get_cookie } from '../../cookie/cookie';

function Login() {

    const navigate = useNavigate()
   
    const [ email , setEmail ] = useState('')
    const [ password , setPassword ] = useState('')
   


    const handlSubmit = async (e) =>{

        e.preventDefault()

        fetch(url_api+"restaurant/login" , {
            method : "POST",
            body : new URLSearchParams({email , password})
        })
        .then(res => res.json())
        .then(success =>{
            if(success){
                console.log("connexion effectué avec success !" , success.token)
                    console.log(success)
                    setEmail('')
                    setPassword('')
                    save_cookie(success.token)
                setTimeout(()=>{
                    navigate("/restaurant")
                },2000);
            }else{
                console.log('------------echec')
            }
            
        })
        .catch(error => {
            console.log('echec de la connexion !' , error)
        })
        
    };

    return (
        <div>
             <div className='login_body'>
             <div className="login_space">
                <div className="login_form">
                
                    <form action="" onSubmit={handlSubmit}>
                    {/* <h1 className='title'><span>La</span> Carte</h1> */}
                    <h1>Connexion</h1>
                        <div className="inputs">
                            {/* <label htmlFor="">Adresse email</label><br /> */}
                            <input type="email" placeholder='Email' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="inputs">
                            {/* <label htmlFor="">Mot de passe</label><br /> */}
                            <input type="password" placeholder='Mot de passe' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <button>Connexion</button>

                        <div className="login_part">
                            <p>Vous n'avez pas de compte ?<Link to={"/register"}> inscrivez-vous</Link></p>
                        </div>
                    </form>
                </div>

             </div>
        </div>
        </div>
    );
}

export default Login;