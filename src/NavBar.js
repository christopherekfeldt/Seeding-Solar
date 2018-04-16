import React from 'react';
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





  render() {
    if(this.props.auth){
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><h3>Seeding Solar</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Home/"><h4>Home</h4></NavLink>
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
                <h4>My name</h4>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Settings
                  </DropdownItem>
                  <DropdownItem>
                    my account
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );}
    else{
      return (
        <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><h3>Seeding Solar</h3></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/Home/"><h4>Home</h4></NavLink>
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>


      );
    }
  }
}
