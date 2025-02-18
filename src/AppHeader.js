import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
// import { ThemeContext } from './ThemeContext'
import './Styles/AppHeader.css';

import { useAuth } from './authContext';

function AppHeader() {
  const { isLoggedIn, user, logout } = useAuth();
  // const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [medicineDropdownVisible, setMedicineDropdownVisible] = useState(false);
  const [profilePopoutVisible, setProfilePopoutVisible] = useState(false);

  const toggleNavbar = () => {
    setNavbarExpanded(!navbarExpanded);
  };

  const toggleDropdown = (setter) => () => setter((prev) => !prev);

  const closeDropdowns = () => {
    setMedicineDropdownVisible(false);
    setUserDropdownVisible(false);
    setProfilePopoutVisible(false);
  };

  return (
    <Navbar expand="lg" expanded={navbarExpanded} className="w-100 classy-navbar"> 
    {/* bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} */}
      <Container fluid>
        <Navbar.Brand as={Link} to="/Home" className="d-flex align-items-center classy-brand">
          <img src={`${process.env.PUBLIC_URL}/assets/Img/Vk_Logo.jpg`} alt="Logo" className="logo-responsive" />
          <div className="brand-title">
            <h3>Medication.com</h3>
            <h6>Always Sure. Be Healthy</h6>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/Home" onClick={closeDropdowns} className="classy-nav-link">HOME</Nav.Link>

            <div
              className="nav-item dropdown mega-dropdown"
              onMouseEnter={() => setMedicineDropdownVisible(true)}
              onMouseLeave={() => setMedicineDropdownVisible(false)}
            >
              <span className="nav-link classy-nav-link">MEDICINE</span>
              {medicineDropdownVisible && (
                <div className="mega-dropdown-menu">
                <div className="dropdown-column">
                  <i className="fas fa-capsules mega-dropdown-icon"></i>
                  <NavLink to="/AddMedicine" className="mega-dropdown-link" style={{height:'89px'}}>Add Medication</NavLink>
                  <i className="fas fa-edit mega-dropdown-icon" style={{marginTop:'15px'}}></i>
                  <NavLink to="/UpdateMedicine" className="mega-dropdown-link">Update Medication</NavLink>
                </div>
                <div className="dropdown-column">
                  <i className="fas fa-id-card mega-dropdown-icon"></i>
                  <NavLink to="/FindByMedicineId" className="mega-dropdown-link">Find by Medication ID</NavLink>
                  <i className="fas fa-list mega-dropdown-icon" style={{marginTop:'15px'}}></i>
                  <NavLink to="/FindAllMedicine" className="mega-dropdown-link">All Medications</NavLink>
                </div>
              </div>              
              )}
            </div>

            <Nav.Link as={NavLink} to="/DrugsAZ" onClick={closeDropdowns} className="classy-nav-link">DRUGS A-Z</Nav.Link>
            <Nav.Link as={NavLink} to="/PillIdentifier" onClick={closeDropdowns} className="classy-nav-link">PILL IDENTIFIER</Nav.Link>
            <Nav.Link as={NavLink} to="/DrugInteractions" onClick={closeDropdowns} className="classy-nav-link">DRUG INTERACTIONS</Nav.Link>
            <Nav.Link as={NavLink} to="/SafetyTips" onClick={closeDropdowns} className="classy-nav-link">SAFETY TIPS</Nav.Link>
            <Nav.Link as={NavLink} to="/NewsUpdates" onClick={closeDropdowns} className="classy-nav-link">NEWS UPDATES</Nav.Link>
            <Nav.Link as={NavLink} to="/Contact" onClick={closeDropdowns} className="classy-nav-link">CONTACT</Nav.Link>

            {isLoggedIn ? (
              <div className="profile-container">
                <img
                  src={user?.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
                  alt="Profile"
                  className="rounded-circle profile-pic-responsive"
                  onClick={toggleDropdown(setProfilePopoutVisible)}
                  style={{marginLeft:'5px'}}
                />
                {profilePopoutVisible && (
                  <div className="profile-popout glass-dropdown-menu" onMouseLeave={closeDropdowns}>
                    <img
                      src={user?.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
                      alt="Profile"
                      className="profile-pic-popout"
                    />
                    <div className="profile-info">
                      <h5>{user?.username}</h5>
                      <p>{user?.email}</p>
                    </div>
                    <div className="profile-links">
                      <NavLink to="/ManageAccount" className="profile-link">Manage Account</NavLink>
                      <NavLink to="/Profile" className="profile-link">Profile Settings</NavLink>
                      <NavLink to="/" onClick={logout} className="profile-link">Logout</NavLink>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="nav-item dropdown mega-dropdown"
                onMouseEnter={() => setUserDropdownVisible(true)}
                onMouseLeave={() => setUserDropdownVisible(false)}
              >
                <span className="nav-link classy-nav-link">USER ACCOUNTS</span>
                {userDropdownVisible && (
                  <div className="mega-dropdown-menu">
                    <div className="dropdown-column">
                      <h6>Account Actions</h6>
                      <NavLink to="/Login" onClick={closeDropdowns} className="mega-dropdown-link">
                        Login
                      </NavLink>
                      <NavLink to="/Register" onClick={closeDropdowns} className="mega-dropdown-link">
                        Register
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
        {/* Theme Toggle */}
        {/* <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button> */}
      </Container>
    </Navbar>
  );
}

export default AppHeader;






// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import './AppHeader.css';
// import { useAuth } from './authContext';
// import { FaCapsules, FaSearch, FaPlus, FaEdit } from 'react-icons/fa';  // FontAwesome Icons

// function AppHeader() {
//   const { isLoggedIn, user, logout } = useAuth();
//   const [navbarExpanded, setNavbarExpanded] = useState(false);
//   const [medicineDropdownVisible, setMedicineDropdownVisible] = useState(false);
//   const [userDropdownVisible, setUserDropdownVisible] = useState(false); // For user account dropdown
//   const [profilePopoutVisible, setProfilePopoutVisible] = useState(false);

//   const toggleNavbar = () => {
//     setNavbarExpanded(!navbarExpanded);
//   };

//   const showDropdown = (setter) => () => setter(true);
//   const hideDropdown = (setter) => () => setter(false);
  
//   const toggleProfilePopout = () => {
//     setProfilePopoutVisible(!profilePopoutVisible);
//   };

//   const closeProfilePopout = () => {
//     setProfilePopoutVisible(false);
//   };

//   return (
//     <Navbar expand="lg" bg="transparent" expanded={navbarExpanded} className="w-100 glassy-navbar">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/Home" className="d-flex align-items-center classy-brand">
//           <img src={`${process.env.PUBLIC_URL}/assets/Img/Vk_Logo.jpg`} alt="Logo" className="logo-responsive" />
//           <div className="brand-title">
//             <h3>Medication.com</h3>
//             <h6>Always Sure. Be Healthy</h6>
//           </div>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link as={NavLink} to="/Home" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">HOME</Nav.Link>

//             <div 
//               className="nav-item dropdown glass-dropdown"
//               onMouseEnter={showDropdown(setMedicineDropdownVisible)}
//               onMouseLeave={hideDropdown(setMedicineDropdownVisible)}
//             >
//               <span className="nav-link classy-nav-link">MEDICINE</span>
//               {medicineDropdownVisible && (
//                 <div className="glass-dropdown-menu">
//                   <NavLink to="/AddMedicine" className="glass-dropdown-item">
//                     <FaPlus className="dropdown-icon" /> Add Medication
//                   </NavLink>
//                   <NavLink to="/UpdateMedicine" className="glass-dropdown-item">
//                     <FaEdit className="dropdown-icon" /> Update Medication
//                   </NavLink>
//                   <NavLink to="/FindByMedicineId" className="glass-dropdown-item">
//                     <FaSearch className="dropdown-icon" /> Find by ID
//                   </NavLink>
//                   <NavLink to="/FindAllMedicine" className="glass-dropdown-item">
//                     <FaCapsules className="dropdown-icon" /> All Medications
//                   </NavLink>
//                 </div>
//               )}
//             </div>
//             <Nav.Link as={NavLink} to="/DrugsAZ" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">DRUGS A-Z</Nav.Link>
//             <Nav.Link as={NavLink} to="/PillIdentifier" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">PILL IDENTIFIER</Nav.Link>
//             <Nav.Link as={NavLink} to="/DrugInteractions" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">DRUG INTERACTIONS</Nav.Link>
//             <Nav.Link as={NavLink} to="/SafetyTips" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">SAFETY TIPS</Nav.Link>
//             <Nav.Link as={NavLink} to="/NewsUpdates" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">NEWS UPDATES</Nav.Link>
//             <Nav.Link as={NavLink} to="/Contact" onClick={() => setNavbarExpanded(false)} className="classy-nav-link">CONTACT</Nav.Link>

//             {isLoggedIn ? (
//               <div className="profile-container">
//                 <img
//                   src={user?.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
//                   alt="Profile"
//                   className="rounded-circle profile-pic-responsive"
//                   onClick={toggleProfilePopout}
//                 />
//                 {profilePopoutVisible && (
//                   <div className="profile-popout glass-effect" onMouseLeave={closeProfilePopout}>
//                     <img
//                       src={user?.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
//                       alt="Profile"
//                       className="profile-pic-popout"
//                     />
//                     <div className="profile-info">
//                       <h5>{user?.username}</h5>
//                       <p>{user?.email}</p>
//                     </div>
//                     <div className="profile-links">
//                       <NavLink to="/ManageAccount" className="profile-link">Manage Account</NavLink>
//                       <NavLink to="/Profile" className="profile-link">Profile Settings</NavLink>
//                       <NavLink to="/" onClick={logout} className="profile-link">Logout</NavLink>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div 
//                 className="nav-item dropdown glass-dropdown"
//                 onMouseEnter={showDropdown(setUserDropdownVisible)}
//                 onMouseLeave={hideDropdown(setUserDropdownVisible)}
//               >
//                 <span className="nav-link classy-nav-link">USER ACCOUNTS</span>
//                 {userDropdownVisible && (
//                   <div className="glass-dropdown-menu">
//                     <NavLink to="/Login" className="glass-dropdown-item">
//                       <FaSearch className="dropdown-icon" /> Login
//                     </NavLink>
//                     <NavLink to="/Register" className="glass-dropdown-item">
//                       <FaPlus className="dropdown-icon" /> Register
//                     </NavLink>
//                   </div>
//                 )}
//               </div>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default AppHeader;












/*


<li
          style={{ marginLeft: '30px', position: 'relative' }}
          onMouseEnter={togglePersonalInfoDropdown}
          onMouseLeave={togglePersonalInfoDropdown}
        >
          <span>Personal Info</span>
          {personalInfoDropdownVisible && (
            <ul className="submenu" style={{ position: 'absolute', background: 'rgba(255, 255, 255, 0.9)', listStyle: 'none', padding: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', top: '100%', left: '50%', transform: 'translateX(-50%)', borderRadius: '5px' }}>
              <li><NavLink to="/UpdateProfile">Update Profile</NavLink></li>
              <li><NavLink to="/ChangePassword">Change Password</NavLink></li>
              <li><NavLink to="/Logout">Logout</NavLink></li>
            </ul>
          )}
        </li>
        
*/
// import React, { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import './AppHeader.css';
// import { useAuth } from './authContext';

// function AppHeader() {
//   const { isLoggedIn, user, logout } = useAuth(); // Assume user has 'profilePic' and 'username' properties
//   const [navbarExpanded, setNavbarExpanded] = useState(false);
//   const [userDropdownVisible, setUserDropdownVisible] = useState(false);
//   const [medicineDropdownVisible, setMedicineDropdownVisible] = useState(false);

//   const toggleNavbar = () => {
//     setNavbarExpanded(!navbarExpanded);
//   };

//   const showDropdown = (setter) => () => setter(true);
//   const hideDropdown = (setter) => () => setter(false);

//   return (
//     <Navbar expand="lg" bg="dark" variant="dark" expanded={navbarExpanded} className="w-100">
//       <Container fluid>
//         <Navbar.Brand as={Link} to="/Home" className="d-flex align-items-center">
//           <img src={`${process.env.PUBLIC_URL}/assets/Img/Vk_Logo.jpg`} alt="Logo" style={{ height: '11vh', width: '11vh', marginRight: '10px' }} />
//           <div>
//             <h3>Medication.com</h3>
//             <h6>Always Sure. Be Healthy</h6>
//           </div>
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="navbar-nav">
//             <Nav.Link as={NavLink} to="/Home" onClick={() => setNavbarExpanded(false)}>HOME</Nav.Link>

//             <NavDropdown
//               title="MEDICINE"
//               id="medicineDropdown"
//               show={medicineDropdownVisible}
//               onMouseEnter={showDropdown(setMedicineDropdownVisible)}
//               onMouseLeave={hideDropdown(setMedicineDropdownVisible)}
//               className="dropdown-menu-custom-1"
//             >
//               <NavDropdown.Item as={NavLink} to="/AddMedicine" onClick={() => setNavbarExpanded(false)}>Add Medication</NavDropdown.Item>
//               <NavDropdown.Item as={NavLink} to="/UpdateMedicine" onClick={() => setNavbarExpanded(false)}>Update Medication</NavDropdown.Item>
//               <NavDropdown.Item as={NavLink} to="/FindByMedicineId" onClick={() => setNavbarExpanded(false)}>Find Medication by ID</NavDropdown.Item>
//               <NavDropdown.Item as={NavLink} to="/FindAllMedicine" onClick={() => setNavbarExpanded(false)}>All Medications</NavDropdown.Item>
//             </NavDropdown>

//               <Nav.Link as={NavLink} to="/DrugsAZ" onClick={() => setNavbarExpanded(false)}>DRUGS A-Z</Nav.Link>
//               <Nav.Link as={NavLink} to="/PillIdentifier" onClick={() => setNavbarExpanded(false)}>PILL IDENTIFIER</Nav.Link>
//               <Nav.Link as={NavLink} to="/DrugInteractions" onClick={() => setNavbarExpanded(false)}>DRUG INTERACTIONS</Nav.Link>
//               <Nav.Link as={NavLink} to="/SafetyTips" onClick={() => setNavbarExpanded(false)}>SAFEY TIPS</Nav.Link>
//               <Nav.Link as={NavLink} to="/NewsUpdates" onClick={() => setNavbarExpanded(false)}>NEWS UPDATES</Nav.Link>
//               <Nav.Link as={NavLink} to="/Contact" onClick={() => setNavbarExpanded(false)}>CONTACT</Nav.Link>

//             {isLoggedIn ? (
//             <Nav.Link as={NavLink} to="/Profile">
//                 <img
//                   src={user?.profilePic || `${process.env.PUBLIC_URL}/assets/Img/vasanth.jpg`}
//                   alt="Profile"
//                   className="rounded-circle"
//                   style={{ width: '40px', height: '40px', borderRadius: '80px', objectFit: 'cover', cursor: 'pointer' }}
//                 />
//             </Nav.Link>
//             ) : (
//             <NavDropdown
//                 title="USER ACCOUNTS"
//                 id="userDropdown"
//                 show={userDropdownVisible}
//                 onMouseEnter={showDropdown(setUserDropdownVisible)}
//                 onMouseLeave={hideDropdown(setUserDropdownVisible)}
//                 className="dropdown-menu-custom-2"
//               >
//                 <NavDropdown.Item as={NavLink} to="/Login" onClick={() => setNavbarExpanded(false)}>Login</NavDropdown.Item>
//                 <NavDropdown.Item as={NavLink} to="/Register" onClick={() => setNavbarExpanded(false)}>Register</NavDropdown.Item>
//             </NavDropdown>
//           )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default AppHeader;