import React ,{useState , useEffect}from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { get_cookie } from '../../cookie/cookie';
import url_api from '../../api/api';
import './codeQR.css';
import Gestion from './Gestion';

function CodeQR(props) {

    const { id } = useParams()
    console.log(id)

    const [ resto , setResto ] = useState([])

    const cookie = get_cookie('cookie_service_resto')
    console.log(cookie)

    const [ restaurant , setRestaurant ] = useState({})


     useEffect( ()=>{
        
        if(cookie){
            fetch(url_api+"restaurant/getRestaurant" , {
                method : 'GET' ,
                headers : { Authorization : cookie} ,
            },)
            .then(res => res.json())
            .then(success =>{
                console.log('.......................' , success.restaurant.img_code_qr)
                setResto(success.restaurant.img_code_qr)
                console.log(resto)
    
                const canvas = document.getElementById("qr-code");
                const ctx = canvas.getContext("2d");
                console.log(ctx)
                let img_QRcode = document.getElementById("img-QRcode");
                img_QRcode.addEventListener('load', function(){
                    ctx.drawImage(img_QRcode, 0, 0, 300, 150);
                }, false);
        })
        .catch(error =>{
            console.log(error)
        })
        }else if(id){
            fetch(url_api+`restaurant/${id}` ,{ method : 'GET'})
            .then(res => res.json())
            .then(resto =>{
                console.log('...........' ,resto.restaurant.img_code_qr)
                setResto(resto.restaurant.img_QRcode)
                const code = resto.restaurant.img_code_qr
                setRestaurant(code)
                console.log(restaurant)
            })
        }
        
            
        

       
        
    
        
     },[])
    
    return (
        <div>
            <div className="card_body">

                <div style={{display : 'block'}}>
                <img id='img-QRcode' src={resto ? resto : restaurant} alt="" className='code_resto'/>
                </div>
            </div>
        </div>
    );
}

export default CodeQR;  