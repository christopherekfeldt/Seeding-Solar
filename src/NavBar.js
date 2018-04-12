import React from 'react';
import SignOutButton from './pages/SignOut';
import './App.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  /*const Navigation = ({authUser}) =>
  <div>
      { authUser
          ? <NavigationAuth />
          : <NavigationNonAuth />
      }
  </div>*/

  /* VAR SÄTTER VI IF ELSE SATSEN? INNUTI UTANFÖR BAKOFRAM IN OCH UT? */

  render() {
    return (
      <div className="Navbar">
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><h3>Seeding Solar</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink id="Home" href="/Home/"><h4>Home</h4></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Contact/"><h4>Contact</h4></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/Projects/"><h4>Projects</h4></NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/SignIn/"><h4>Sign in</h4></NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                <h4>Options</h4>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    My account
                  </DropdownItem>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Log out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
