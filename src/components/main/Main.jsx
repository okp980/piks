import React from 'react'
import './main.css'
import Masonry from 'react-masonry-css'
import Image from '../image/Image';




export default function Main({ resultPhotos, isLoading, error, filterAmount, changeFIlteredAmount, searchText }) {





    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
    };




    if (isLoading || !resultPhotos) return <div className="main__loading"><p>Loading...</p></div>
    return (
        <div className='main'>
            <div className="container">
                <div className="main__title">
                    <h3><span>displaying {filterAmount} results from search word </span> <i>{searchText || 'happy'}</i></h3>
                    <form className="main__form">
                        <label htmlFor="imageNuber">filter amount</label>
                        <select name="imageNumber" className='main__select' value={filterAmount} onChange={changeFIlteredAmount}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </form>
                </div>
                <div className="main__content">

                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {resultPhotos.map(photo => {
                            return (
                                <Image key={photo.id} src={photo.src.portrait} title={photo.photographer} />
                            )
                        })}


                    </Masonry>
                </div>

            </div>

        </div>
    )
}
