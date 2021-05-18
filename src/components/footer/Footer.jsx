import React from 'react'
import './footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className="container">
                <ul className="footer__menu menu--1">
                    <li className="footer__item footer__item--title">about us</li>
                    <li className="footer__item">what we do</li>
                    <li className="footer__item">products</li>
                    <li className="footer__item">target market</li>
                    <li className="footer__item">stationary</li>
                </ul>
                <ul className="footer__menu menu--2">
                    <li className="footer__item footer__item--title">contact us</li>
                    <li className="footer__item">facebook</li>
                    <li className="footer__item">twitter</li>
                    <li className="footer__item">instagram</li>
                    <li className="footer__item">github</li>
                </ul>
                <ul className="footer__menu menu--3">
                    <li className="footer__item footer__item--title">affiliates</li>
                    <li className="footer__item">kwasa servers</li>
                    <li className="footer__item">mbs motors</li>
                    <li className="footer__item">wakanda</li>
                    <li className="footer__item">forever</li>
                </ul>
                <ul className="footer__menu menu--4">
                    <li className="footer__item footer__item--title">branch office</li>
                    <li className="footer__item">head office</li>
                    <li className="footer__item">lagos branch</li>
                    <li className="footer__item">abuja branch</li>
                    <li className="footer__item">google us</li>
                </ul>
                <p>made with love by <span>okp</span> &copy; 2021</p>
            </div>
        </div>
    )
}
