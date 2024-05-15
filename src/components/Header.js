import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="background-image" style={{ backgroundImage: "url('/ubc_image.png')" }}></div>
      <img src="/ubc_logo.png" alt="University Logo" className="header-logo" />
    </header>
  );
}

export default Header;
