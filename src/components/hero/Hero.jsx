import React, { useState, useEffect, useCallback } from 'react'
import './hero.css'
import Spinner from '../spinner/Spinner';
import useFetch from '../../hooks/use-fetch';

export default function Hero() {

    const [data, setData] = useState(null);
    // fetch data

    const url = 'https://api.pexels.com/v1/search?query=mountain?page=4&per_page=15';

    const { fetchRequest, loading, error } = useFetch();

    //generate random number 1-15
    const randomNum = function () {
        return Math.floor(Math.random() * 16)
    }


    const handleDataRequest = useCallback((data) => {
        let photos = data.photos;
        const num = randomNum()

        setData(photos[num]);
    }, []);

    useEffect(() => {
        fetchRequest(url, handleDataRequest);
    }, [fetchRequest, handleDataRequest]);






    if (error) return <p>error</p>

    return (
        <div className='hero'>
            {loading || !data ? <Spinner /> : <img src={data.src.landscape} alt={data.photographer} />}
        </div>
    )
}
