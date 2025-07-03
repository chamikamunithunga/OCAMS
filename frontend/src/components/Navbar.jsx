import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We'll create this file for custom styles

const Navbar = () => (
  <nav className="custom-navbar">
    <div className="navbar-logo">
      <span role="img" aria-label="hospital">🏥</span>
      <span className="navbar-title">OCAMS</span>
    </div>
    <div className="navbar-links">
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/patient">Patient</Link>
      <Link to="/doctor">Doctor</Link>
      <Link to="/admin">Admin</Link>
    </div>
  </nav>
);

export default Navbar; 