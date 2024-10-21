import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import './Sidebar.css'; 

const Sidebar = ({ isSidebarExpanded }) => {
  const location = useLocation();

  const sidebarItems = [
    { text: 'Notes', icon: <LightbulbIcon />, path: '/dashboard/' },
    { text: 'Archive', icon: <ArchiveIcon />, path: '/dashboard/archive' },
    { text: 'Trash', icon: <DeleteIcon />, path: '/dashboard/trash' },
  ];

  return (
    <div className={`sidebar-container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <ul className="sidebar-list">
          {sidebarItems.map((item) => (
            <li
              key={item.text}
              className={`sidebar-list-item ${
                location.pathname === item.path ? 'selected' : ''
              }`}
            >
              <Link to={item.path} className="sidebar-link">
                <span className="sidebar-icon">{item.icon}</span>
                {isSidebarExpanded && <span className="sidebar-text">{item.text}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
