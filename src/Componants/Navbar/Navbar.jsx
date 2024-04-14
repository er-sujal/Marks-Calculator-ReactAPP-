import React from 'react'
import logo from "./../../Assets/logot.png"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className="logo">
            <img src={logo} alt="logo here" height={80} />
        </div>
        <ul className="navmanu">
            <li><a href="https://er-sujal.github.io/Sujal-Kakadiya/">Sujal Kakadiya</a></li>
            <li><a href="https://www.instagram.com/imskakadiya/">Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/sujalkakadiya">LinkedIn</a></li>
            <li><a href="https://github.com/er-sujal">Github</a></li>
        </ul>
    </div>
  )
}

export default Navbar