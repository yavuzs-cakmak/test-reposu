import React from 'react'
import './Footer.css';
 function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
<a href="#">Yasal Bilgi</a>
<a href="#">Kişisel Verilerin Korunması</a>
<a href="#">Çerezler</a>
<a href="#">Bilgi Toplumu Hizmetleri</a>
<a href="#">Gönüllü Düzenleyici Faaliyet</a>
<a href="#">Yardım</a>
      </div>
       <div className="footer-copy">
        <p>© Renault 2017 - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );

};
export default Footer;
