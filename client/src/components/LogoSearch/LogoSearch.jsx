import React from 'react'
import Logo from '../../img/logo.png'
import { BsSearch } from "react-icons/bs"
import "./LogoSearch.css"

function LogoSearch() {
  return (
    <div className='LogoSearch'>
        <img src={Logo} alt="" />
        <div className="Search">
            <input type="text" placeholder='#Explore'/>
            <div className="s-icon">
            <BsSearch/>
            </div>
        </div>
    </div>
  )
}

export default LogoSearch