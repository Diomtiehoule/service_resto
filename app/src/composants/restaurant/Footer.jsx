import React from 'react';
import './footer.css'

function Footer() {
    return (
        <div className='footer_zone'>
            <div className="info_footer">
            <div className="about_us">
                <h1>A propos de La  carte</h1>
                <ul>
                    <li>Restaurant</li>
                    <li>Terrasse</li>
                    <li>Carte</li>
                    <li>Information</li>
                </ul>
            </div>
            <div className="popular_place">
                <h1>Zone populaires</h1>
                <ul>
                    <li>Cocody</li>
                    <li>Marcory</li>
                    <li>Yopougon</li>
                    <li>Koumassi</li>
                    <li>Treichville</li>
                    <li>Port-bouet</li>
                </ul>
            </div>
            <div className="contact_us">
                <h1>Nous contacter</h1>
                <ul>
                    <li>Avenue caraibes</li>
                    <li>+225 05-06-85-96-32</li>
                    <li>exemple@gmail.com</li>
                </ul>
                <div className="link">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-facebook"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-youtube"></i>
                </div>
               
            </div>

            <div className="subscribe">
                <h1>Abonnez-vous</h1>
                <p>Rejoingnez la team pour ne manquer <br /> aucune notification et offres des terrasse <br /> de la ville.</p>
                <div className="inputs_zone">
                <input type="text" placeholder='Adresse mail' />
                <button>Envoyer</button>
                </div>
                
            </div>
            </div>
            

            <div className="border"></div>

            <div className="copyright_part">
                <p>2023 Copyright tout droit réservé La Carte.</p>
            </div>

        </div>
    );
}

export default Footer;