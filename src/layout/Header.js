import React, { useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import googlekeep from '../assets/keep.png';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamSharpIcon from '@mui/icons-material/ViewStreamSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import profileimage from '../assets/profile4.png';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <MenuIcon className="menu-icon" onClick={toggleSidebar} />
          <div className="logo-section">
            <img src={googlekeep} alt="keep" className="keep-image" />
            <div className="logo-text">Fundoo Notes</div>
          </div>
        </div>

        <div className="center-section">
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="right-section">
          <RefreshIcon className="header-icon" />
          <ViewStreamSharpIcon className="header-icon" />
          <SettingsIcon className="header-icon" />
          <AppsIcon className="header-icon" />
          <div className="profile-container">
            <img
              src={profileimage}
              alt="profile"
              className="profile-image"
              onClick={toggleMenu}
            />
            {menuOpen && (
              <div className="dropdown-menu">
                <div className="menu-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
