import React from 'react';
import { FaPrescriptionBottleAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <FaPrescriptionBottleAlt className="me-2" />
          <strong>Eczane v1.0</strong>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;