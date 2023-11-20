import React from 'react';
import { Link , useNavigate } from 'react-router-dom';
import './home.css'
import photo from '../media/home.jpg'

function Home() {
    return (
        <div className='home'>
            <h1 className='title'><span>La</span> Carte</h1>

            <div className="slogan_text">
                <p>Envi de découvrir ou faire découvrir les meilleurs terrasse de la place , vous êtes à la bonne adresse. Vivez l'expérience de <h1 className='title2'><span>La</span> Carte</h1></p>
            </div>
            <div className="button_users">
                <button className="restaurant-button">Restaurant</button>
                
                <button className="utilisateur-button"><Link to={"/liste_des_restaurants"}>Utilisateur</Link></button>
            </div>
        </div>
    );
}

export default Home;