import React from 'react'
import './image.css'

export default function Image({ src, title }) {
    return (
        <div className='image'>
            <img src={src} alt={title} />
        </div>
    )
}
