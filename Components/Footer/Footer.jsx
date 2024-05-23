import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import iitk from '../Assets/iitk.jpg'
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Campus E-Bay</p>
        </div>
        <div className="head">
        <h1>A campus shopping app</h1>
        </div>
        <ul className='footer-links'>
            <li>Indian Institute of Technology, Kanpur</li>
        </ul>
        <div className="iitk">
            <img src={iitk} alt="" />
        </div>
    </div>
  )
}

export default Footer
