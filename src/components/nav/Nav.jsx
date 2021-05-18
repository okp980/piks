import React, { useState } from 'react'
import './nav.css'

export default function Nav({ handleChange, searchText, handldeSearchText }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className='nav'>
            <div className="container">
                <div className="nav__logo">
                    <h1>p<span>i</span>ks</h1>
                </div>
                <div className="nav__search">
                    <form className="nav__form">
                        <input type="search" placeholder='Type in a search keyword e.g Happy' value={searchText} onChange={handldeSearchText} />

                    </form>
                </div>
                <div className="nav__toggle" onClick={() => setIsOpen(prev => !prev)}>
                    {!isOpen ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}
                </div>
                <ul className={isOpen ? "nav__menu" : "nav__menu nav__menu--close"}>
                    <li className="nav__menu__items" onClick={() => handleChange('men')}>
                        men
                </li>
                    <li className="nav__menu__items" onClick={() => handleChange('women')}>
                        women
                </li>
                    <li className="nav__menu__items" onClick={() => handleChange('cars')}>
                        cars
                </li>
                    <li className="nav__menu__items" onClick={() => handleChange('house')}>
                        house
                </li>
                    <li className="nav__menu__items" onClick={() => handleChange('fashion')}>
                        fashion
                </li>
                </ul>
            </div>
        </nav>
    )
}
