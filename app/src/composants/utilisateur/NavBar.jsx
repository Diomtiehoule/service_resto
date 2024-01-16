import React from 'react';
import { useNavigate , Link} from 'react-router-dom';
import './navbar.css'

function NavBar() {
    const navigate = useNavigate()
    return (
        <div className='navBar_utilisateur'>
            <nav>
                <Link to={'/'}><h1>La<span>Carte</span></h1></Link>
                
            </nav>
            {/* <nav>
                <h2 className=''><Link to={'/'}><span>La</span> Carte</Link></h2>

                <div className="research_zone">
                    <input type="text" placeholder='Rechercher...'/>
                </div>
            </nav> */}
        </div>
    );
}

export default NavBar;