import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

const Sidebar = () => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={sidebarRef}
      style={{
        width: "250px",
        background: "linear-gradient(135deg, #4b79a3, #283e51)",
        color: "#fff",
        padding: "20px",
        height: "100vh",
        fontFamily: "'Roboto', sans-serif",
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
        position: "fixed",
      }}
    >
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", borderBottom: "2px solid #fff", paddingBottom: "10px" }}>
        Admin Dashboard
      </h2>
      <nav>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li style={{ marginBottom: "15px" }}>
            <NavLink
              to="/users"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "500",
                padding: "10px",
                display: "block",
                borderRadius: "4px",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              activeStyle={{
                backgroundColor: "#627d98",
                transform: "scale(1.05)",
              }}
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/roles"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "500",
                padding: "10px",
                display: "block",
                borderRadius: "4px",
                transition: "background-color 0.3s ease, transform 0.2s ease",
              }}
              activeStyle={{
                backgroundColor: "#627d98",
                transform: "scale(1.05)",
              }}
            >
              Roles
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
