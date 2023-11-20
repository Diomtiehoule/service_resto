import React from 'react';
import './menuResto.css'
import photo from '../../media/resto1.jpeg'

function MenuResto() {
    return (
        <div className='restaurant_zone'>
            <div className="zone_info">
                <div className="image_resto">
                    <img src={photo} alt="" />
                </div>
                <div className="info">
                    <p>Nom restaurant</p>
                    <p>Zone , Abidjan</p>
                    <p>Categorie : ...</p>
                </div>
                <div className="other_info">
                    <p>Contact: 00000000</p>
                </div>
            </div>

            <div className="zone_qrcode">
                <div className="qrcode">

                </div>
                <p>Scannez</p>
            </div>
        </div>
    );
}

export default MenuResto;