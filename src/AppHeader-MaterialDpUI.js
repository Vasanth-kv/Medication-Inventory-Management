import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './authContext';
import './AppHeader.css';

function AppHeader() {
  const { isLoggedIn, user, logout } = useAuth(); // Assume user has 'profilePic' and 'username' properties
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [anchorElMedicine, setAnchorElMedicine] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElContent, setAnchorElContent] = useState(null);

  const handleOpenMedicineMenu = (event) => setAnchorElMedicine(event.currentTarget);
  const handleCloseMedicineMenu = () => setAnchorElMedicine(null);
  const handleOpenContentMenu = (event) => setAnchorElContent(event.currentTarget);
  const handleCloseContentMenu = () => setAnchorElContent(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      if (anchorElMedicine && !anchorElMedicine.contains(event.target)) handleCloseMedicineMenu();
      if (anchorElUser && !anchorElUser.contains(event.target)) handleCloseUserMenu();
      if (anchorElContent && !anchorElContent.contains(event.target)) handleCloseContentMenu();
    });
    return () => document.removeEventListener('mousedown', handleCloseMedicineMenu);
  }, [anchorElMedicine, anchorElUser, anchorElContent]);

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setNavbarExpanded(!navbarExpanded)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/Home" color="inherit">
            Medication.com
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            <IconButton color="inherit" onClick={handleOpenMedicineMenu}>Medicine</IconButton>
            <Menu
              anchorEl={anchorElMedicine}
              open={Boolean(anchorElMedicine)}
              onClose={handleCloseMedicineMenu}
            >
              <MenuItem component={NavLink} to="/AddMedicine" onClick={handleCloseMedicineMenu}>Add Medication</MenuItem>
              <MenuItem component={NavLink} to="/UpdateMedicine" onClick={handleCloseMedicineMenu}>Update Medication</MenuItem>
              <MenuItem component={NavLink} to="/FindByMedicineId" onClick={handleCloseMedicineMenu}>Find Medication by ID</MenuItem>
              <MenuItem component={NavLink} to="/FindAllMedicine" onClick={handleCloseMedicineMenu}>All Medications</MenuItem>
            </Menu>

            <IconButton color="inherit" onClick={handleOpenContentMenu}>Content</IconButton>
            <Menu
            anchorEl={anchorElContent}
            open={Boolean(anchorElContent)}
            onClose={handleCloseContentMenu}>
            <MenuItem component={NavLink} to="/DrugsAZ" onClick={handleCloseContentMenu}>DRUGS A-Z</MenuItem>
            <MenuItem component={NavLink} to="/PillIdentifier" onClick={handleCloseContentMenu}>PILL IDENTIFIER</MenuItem>
            <MenuItem component={NavLink} to="/DrugInteractions" onClick={handleCloseContentMenu}>DRUG INTERACTIONS</MenuItem>
            <MenuItem component={NavLink} to="/SafetyTips" onClick={handleCloseContentMenu}>SAFETY TIPS</MenuItem>
            <MenuItem component={NavLink} to="/NewsUpdates" onClick={handleCloseContentMenu}>NEWS UPDATES</MenuItem>
            <MenuItem component={NavLink} to="/Contact" onClick={handleCloseContentMenu}>CONTACT</MenuItem>
            </Menu>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" onClick={handleOpenUserMenu}>
                  <img
                    src={user.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
                    alt="Profile"
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={NavLink} to="/Profile" onClick={handleCloseUserMenu}>Profile</MenuItem>
                  <MenuItem component={NavLink} to="/Logout" onClick={() => { handleCloseUserMenu(); logout(); }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <IconButton color="inherit" onClick={handleOpenUserMenu}>User Accounts</IconButton>
            )}
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem component={NavLink} to="/Login" onClick={handleCloseUserMenu}>Login</MenuItem>
              <MenuItem component={NavLink} to="/Register" onClick={handleCloseUserMenu}>Register</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;


//CSS
// /* Material Design Dropdown Styles */
// .material-dropdown {
//   position: relative;
//   display: inline-block;
// }

// .material-dropdown .dropdown-btn {
//   background-color: #6200ea; /* Material purple */
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 16px;
//   text-transform: uppercase;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// }

// .material-dropdown .dropdown-content {
//   display: none;
//   position: absolute;
//   background-color: #ffffff;
//   min-width: 160px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   border-radius: 4px;
//   z-index: 1000;
//   top: 100%;
//   left: 0;
// }

// .material-dropdown:hover .dropdown-content {
//   display: block;
// }

// .material-dropdown .dropdown-content a {
//   color: #333;
//   padding: 12px 16px;
//   text-decoration: none;
//   display: block;
//   text-align: left;
//   transition: background-color 0.2s;
// }

// .material-dropdown .dropdown-content a:hover {
//   background-color: #f1f1f1;
// }
