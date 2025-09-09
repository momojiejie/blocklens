import React from 'react'
import logo from '../assets/blocklens__logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="flex justify-between bg-black">
        <div className="nav__right">
            <figure className="nav__logo--wrapper">
                <img src={logo} alt="" className="w-90 h-30" />
            </figure>
        </div>
        <div className="flex justify-center items-center">
            <ul className="flex space-x-10 mr-10">
                <li className="text-white font-mono text-[24px]"><Link to="/">Home</Link></li>
                <li className="text-white font-mono text-[24px]"><Link to="/search">Search Crypto</Link></li>
                <li className="text-white font-mono text-[24px]">Contact</li>
            </ul>
        </div>
    </div>
  )
}
