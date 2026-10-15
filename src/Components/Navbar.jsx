import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='logo'>
            MovieHub
        </div>
        <div className='nav-links'>
            <a href="/">Home</a>
            <a href="/movies">Movies</a>
        </div>
    </div>
  )
}

export default Navbar