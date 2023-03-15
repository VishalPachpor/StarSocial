import React from 'react'
import { useState } from 'react';
import "./Navbar.css"
import { NavLink } from 'react-router-dom'
import HomeIcon from "@material-ui/icons/Home";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';


function Navbar() {

  const [account, setAccount] = useState();

  return (
    <div>
      <nav id='nav'>
        <div className='container flex'>
          <NavLink to='/' style={{textDecoration:"none"}}>
          <h2 style={{ color:"white"}}> Socialstar ✨</h2>
          </NavLink>

          <div className='links'>
            <NavLink to='/'><a href=" "><HomeIcon /></a></NavLink>
            <NavLink to='/Search'><a href=" "><SearchOutlinedIcon /></a></NavLink>
            <NavLink to='/profile'><a href=" "><PersonOutlineOutlinedIcon /></a></NavLink>

            <button style={{textTransform:"capitalize"}}> Shabbiryk.eth</button>
          </div>

        </div>

      </nav>
    </div>
  )
}

export default Navbar
