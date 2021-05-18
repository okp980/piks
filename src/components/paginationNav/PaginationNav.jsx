import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import './paginationNav.css'

function PaginationNav({ handleCurrentPage, pageNumber }) {

    return (


        <div className='paginationNav'>
            <div className="container">
                <Pagination count={10} page={pageNumber} onChange={(event, value) => handleCurrentPage(value)} />
            </div>
        </div>
    )
}

export default React.memo(PaginationNav);