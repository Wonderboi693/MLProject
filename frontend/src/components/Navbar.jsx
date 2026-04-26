import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, BarChart2, TrendingUp, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={18} /> },
    { name: 'Predict', path: '/predict', icon: <Activity size={18} /> },
    { name: 'Data Analytics', path: '/data-analytics', icon: <BarChart2 size={18} /> },
    { name: 'Model Analytics', path: '/model-analytics', icon: <TrendingUp size={18} /> },
  ];

  return (
    <nav className="glass-nav" style={{ padding: '0.75rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
          <Activity size={24} />
          <span>MLFlow</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-desktop" style={{ display: 'flex', gap: '1.5rem' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isActive ? 'var(--secondary)' : 'var(--text-muted)',
                padding: '0.5rem 0',
                borderBottom: isActive ? '2px solid var(--secondary)' : '2px solid transparent',
                transition: 'all 0.2s ease',
                fontSize: '0.95rem'
              })}
            >
              {item.icon}
              <span className="nav-text">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'none', 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-main)', 
            cursor: 'pointer' 
          }}
          className="nav-mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          padding: '1.5rem 0', 
          marginTop: '0.5rem',
          borderTop: '1px solid var(--border)' 
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: isActive ? 'var(--secondary)' : 'var(--text-main)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: isActive ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
