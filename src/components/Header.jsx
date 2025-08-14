import React from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='header'>
      <Link className='link' to="/">Anasayfa</Link>
      <Link className='link' to="/about">Hakkımızda</Link>
      <Link className='link' to="/products">Ürünler</Link>
      <Link className='link' to="/contacts">İletişim</Link>
    </div>
  )
}

export default Header
