// src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaNewspaper, FaPlane, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext'; // Ensure this path is correct

function Navbar({ onToggle }) {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Karditsa Aeroclub</Link>
                <button className="navbar-toggler" type="button" onClick={onToggle} aria-label="Toggle navigation">
                    <FaBars style={{ fontSize: '24px', color: 'white' }} />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/"><FaHome /> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news"><FaNewspaper /> News</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/flights"><FaPlane /> Flights</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><FaSignInAlt /> Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register"><FaUserPlus /> Register</Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"><FaHome /> Dashboard</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;