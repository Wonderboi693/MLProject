import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, BarChart2, TrendingUp, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'Predict', path: '/predict', icon: <Activity size={18} /> },
    { name: 'Data Analytics', path: '/data-analytics', icon: <BarChart2 size={18} /> },
    { name: 'Model Analytics', path: '/model-analytics', icon: <TrendingUp size={18} /> },
  ];

  return (
    <nav className="glass-nav" style={{ padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
          <Activity size={24} />
          <span>MLFlow Predictor</span>
        </div>

        {/* Desktop nav */}
        <div className="nav-links-desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isActive ? 'var(--secondary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--secondary)' : '2px solid transparent',
                paddingBottom: '0.25rem',
                transition: 'all 0.2s ease'
              })}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav menu */}
      {menuOpen && (
        <div className="nav-links-mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                color: isActive ? 'var(--secondary)' : 'var(--text-muted)',
                background: isActive ? 'rgba(236, 72, 153, 0.1)' : 'transparent',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              })}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
