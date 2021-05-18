import React from 'react'
import './errorPage.css'

export default function ErrorPage() {
    return (
        <div className='error'>
            <div className="error__info">
                <h1>An Error Occured</h1>
                <p>sorry error occured while trying to load this page, please try again after some time</p>
                <button>reload</button>
            </div>
        </div>
    )
}
