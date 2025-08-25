import React from 'react';
import { Link } from "react-router-dom";

function Header() {
  return (
    
    <div className="header">
      <img src="/renaLogo.png" alt="Logo" className="logo" style={{ width: '40px', height: 'auto' }} />
      <Link className='link' to="/">Anasayfa</Link>
      <Link className='link' to="/about">Hakkımızda</Link>
      <Link className='link' to="/products">Ürünler</Link>
      <Link className='link' to="/contacts">İletişim</Link>

      <div className="link-with-subtext">
        <Link className="link" to="/fault">Arıza Talep Formu</Link>
        <span className="subtext">Formu doldur, seni hemen arayalım</span>
      </div>
    </div>
  );
}

export default Header;