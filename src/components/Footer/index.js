import React from 'react';
import {  Nav, NavItem } from 'reactstrap';

const footerStyle = {
  color: 'black',
  backgroundColor: 'grey',
  height: 150
};

const footerTextStyle = {
  marginTop: 40
};

function Footer() {
  return (
    <footer style={footerStyle}>
        <Nav style={footerTextStyle} justified>
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


          <Nav justified>
          <NavItem
            eventKey={1}>
            Email
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
          <NavItem
            eventKey={3}>
            Facebook
          </NavItem>
        </Nav>



          <Nav justified>
          <NavItem
            eventKey={1}>
            Phone
          </NavItem>
          <NavItem
            eventKey={2}
            title="Item">
            Privacy policy
          </NavItem>
          <NavItem
            eventKey={3}>
            Instagram
          </NavItem>
        </Nav>



        <div className="text-center small copyright">
          © RLM 2016
        </div>
    </footer>
  );
}

export default Footer;