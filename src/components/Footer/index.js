import React from 'react';
import {  Nav, NavItem, NavLink } from 'reactstrap';

const footerStyle = {
  color: 'white',
  backgroundColor: 'black',
  height: 200
};

const footerTextStyleFirst = {
  marginTop: 20,
  color: 'grey'
};

const footerTextStyleSecond = {
  marginTop: 20
};

const copyrightStyle ={
  marginTop: 20
}

const NavLinkStyle ={
  color: 'white'
}
function Footer() {
  return (
    <footer style={footerStyle}>
        <Nav style={footerTextStyleFirst} justified>
          <NavItem
            eventKey={1}>
            Contact
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            FAQ
          </NavItem>
          <NavItem
            eventKey={3}>
            Follow
          </NavItem>
        </Nav>


          <Nav style={footerTextStyleSecond} justified>
          <NavItem
            eventKey={1}>
            <NavLink style={NavLinkStyle} href='/Contact/'>Email</NavLink>
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            <NavLink style={NavLinkStyle} href='/Contact/'>Terms & Conditions</NavLink>
          </NavItem>
          <NavItem
            eventKey={3}>
            <NavLink style={NavLinkStyle} href='/Contact/'>Facebook</NavLink>
          </NavItem>
        </Nav>



          <Nav justified>
          <NavItem
            eventKey={1}>
            <NavLink style={NavLinkStyle} href='/Contact/'>Phone</NavLink>
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            <NavLink style={NavLinkStyle} href='/Contact/'>Privacy policy</NavLink>
          </NavItem>
          <NavItem
            eventKey={3}>
            <NavLink style={NavLinkStyle} href='/Contact/'>Instagram</NavLink>
          </NavItem>
        </Nav>



        <div style={copyrightStyle} className="text-center small copyright">
          © RLM 2016
        </div>
    </footer>
  );
}

export default Footer;