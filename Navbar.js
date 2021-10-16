import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return <nav className="navbar navbar-expand-sm navbar-dark bg-secondary sticky-top">
        <div className="container-fluid">
            
            <NavLink to="/" className="nav-link navbar-brand">
                BUJO
            </NavLink>
            
            <ul className="navbar-nav">
        
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" >
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/tracker" className="nav-link">
                        Tracker
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cards" className="nav-link">
                        Cards
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/journal" className="nav-link">
                        Journal
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/goal" className="nav-link">
                        Goal
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/letter" className="nav-link">
                        Letter
                    </NavLink>
                </li>
            </ul>
      
        </div>
    </nav>
}

export default Navbar

