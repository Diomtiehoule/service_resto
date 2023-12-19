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
    const [currentPage , setCurrentPage] = useState(1)
    const [ recordPerPage , setRecordPerPage ] = useState(8)

    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage
    const currentRecords = allMenu.slice(indexOfFirstRecord,indexOfLastRecord)
    console.log(currentRecords)
    const nPage = Math.ceil(allMenu.length / recordPerPage)
    const pageNumbers = [... Array(nPage +1).keys()].slice(1);

    const nextPage = () => {
        if(currentPage !== nPage) setCurrentPage(currentPage + 1)
    }

    const prevPage = () =>{
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
console.log(currentPage)
    return (
        <div className='pagination_body'>
            <nav>
                <ul className="pagination">
                    <li className='page-item'>
                        <a className='page-link prev' onClick={prevPage} href="#">Precedent</a>
                    </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className={`page-item ${currentPage == pgNumber ? 'actif' : ''}`}>

                        <a href='#' onClick={() => setCurrentPage(pgNumber)} className='page-lien'>{pgNumber}</a>

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