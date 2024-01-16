import React , {useState, useEffect} from 'react';
import './pagination.css'
import url_api from '../../api/api';
import { get_cookie } from '../../cookie/cookie';

function Pagination(props) {

    const cookie = get_cookie('cookie_service_resto')
    const [ allMenu , setAllMenu ] = useState([])

    useEffect(()=>{
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
    },[])

    //  code pagination 
    const [ currentPage , setCurrentPage] = useState(1)
    const recordPerPage = 8;
    const lastIndex = currentPage * recordPerPage
    const firstIndex = lastIndex - recordPerPage
    const records = allMenu.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(allMenu.length / recordPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)

    const nextPage = () => {
        if(currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () =>{
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const changePage = (id) => {
        setCurrentPage(id)
    }
console.log(currentPage)
    return (
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
    );
}

export default Pagination;