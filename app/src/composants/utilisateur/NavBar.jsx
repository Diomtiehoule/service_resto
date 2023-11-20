import React from 'react';
import './navbar.css'

function NavBar() {
    return (
        <div className='navBar_utilisateur'>
            <nav>
                <h2 className=''><span>La</span> Carte</h2>

                <div className="research_zone">
                    <input type="text" placeholder='Rechercher...'/>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;