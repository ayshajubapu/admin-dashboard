import React, { useEffect } from "react";
import { gsap } from "gsap"; // Import GSAP
import "./Navbar.css"; // Import CSS file for styling

const Navbar = () => {
  useEffect(() => {
    // GSAP animations when the navbar is loaded
    gsap.fromTo(
      ".navbar", 
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );
    
    gsap.fromTo(
      ".nav-link", 
      { opacity: 0, x: -100 }, 
      { opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: "power4.out" }
    );
  }, []);
  
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Admin Dashboard</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#dashboard" className="nav-link">Dashboard</a></li>
        <li><a href="#users" className="nav-link">Users</a></li>
        <li><a href="#settings" className="nav-link">Settings</a></li>
        <li><a href="#logout" className="nav-link">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
