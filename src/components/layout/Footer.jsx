import React from 'react';
import './Footer.css'; // Assuming you will create a Footer.css for specific styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Esports Team. All rights reserved.</p>
    </footer>
  );
};

export default Footer;