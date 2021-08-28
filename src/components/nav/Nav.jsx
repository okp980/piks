import React, { useState, useEffect } from 'react'
import './nav.css'

function Nav({ handleChange, onHandleSearch }) {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')

    const handleInput = (e) => {
        if (e.target.value.trim() < 0) {
            return;
        }
        setInput(e.target.value.trim());
    }

    // ** sets input after a user pause typing
    useEffect(() => {
        const timer = setTimeout(() => {
            onHandleSearch(input)
        }, 1000)
        return () => {
            clearTimeout(timer)
        }
    }, [input, onHandleSearch]) //onHandlerSearch prop has been handled with useCallback to prevent unwanted action of useEffect

    //  ** updates the searchText value to the category the user clicks from nav
    const handleNavigation = (category) => {
        handleChange(category)
        setIsOpen(prev => !prev)
    }
    return (
        <nav className='nav'>
            <div className="container">
                <div className="nav__logo">
                    <h1>p<span>i</span>ks</h1>
                </div>
                <div className="nav__search">
                    <form className="nav__form">
                        <input type="search" placeholder='Type in a search keyword e.g Happy' value={input} onChange={handleInput} />

                    </form>
                </div>
                <div className="nav__toggle" onClick={() => setIsOpen(prev => !prev)}>
                    {!isOpen ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}
                </div>
                <ul className={isOpen ? "nav__menu" : "nav__menu nav__menu--close"}>
                    <li className="nav__menu__items" onClick={() => handleNavigation('men')}>
                        men
                    </li>
                    <li className="nav__menu__items" onClick={() => handleNavigation('women')}>
                        women
                    </li>
                    <li className="nav__menu__items" onClick={() => handleNavigation('cars')}>
                        cars
                    </li>
                    <li className="nav__menu__items" onClick={() => handleNavigation('house')}>
                        house
                    </li>
                    <li className="nav__menu__items" onClick={() => handleNavigation('fashion')}>
                        fashion
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
