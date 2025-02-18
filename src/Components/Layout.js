// src/Components/Layout.js

import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function Layout({ children }) {
  return (
    <div>
      {/* Header or Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Main">Main</Nav.Link>
              <Nav.Link href="/Profile">Profile</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              <Nav.Link href="/Logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <Container style={{ paddingTop: '20px' }}>
        {children} {/* This renders the specific route component */}
      </Container>

      {/* Footer */}
      <footer style={{ marginTop: 'auto', padding: '10px 0', backgroundColor: '#f8f9fa' }}>
        <Container>
          <span>&copy; 2024 MyApp. All rights reserved.</span>
        </Container>
      </footer>
    </div>
  );
}

export default Layout;
