import React from 'react';
import {  Nav, NavItem, NavLink } from 'reactstrap';

//Footer for all pages.
function Footer() {
  return (
    <footer style={footerStyle}>
        <Nav style={footerTextStyleFirst} justified>
          <NavItem
            eventkey={1}>
            Contact
          </NavItem>
          <NavItem
            eventkey={2}
            title="Item">
            FAQ
          </NavItem>
          <NavItem
            eventkey={3}>
            Follow
          </NavItem>
        </Nav>


          <Nav style={footerTextStyleSecond} justified>
          <NavItem
            eventkey={1}>
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Email</NavLink>
          </NavItem>
          <NavItem
            eventkey={2}
            title="Item">
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Terms & Conditions</NavLink>
          </NavItem>
          <NavItem
            eventkey={3}>
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Facebook</NavLink>
          </NavItem>
        </Nav>



          <Nav justified>
          <NavItem
            eventkey={1}>
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Phone</NavLink>
          </NavItem>
          <NavItem
            eventkey={2}
            title="Item">
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Privacy policy</NavLink>
          </NavItem>
          <NavItem
            eventkey={3}>
            <NavLink style={NavLinkStyle} href='/AboutUs/'>Instagram</NavLink>
          </NavItem>
        </Nav>



        <div style={copyrightStyle} className="text-center small copyright">
          © Seeding Solar 2018
        </div>
    </footer>
  );
}
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

export default Footer;