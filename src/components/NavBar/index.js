import React from 'react';
import {firebase, auth, db} from '../../firebase';
import { connect } from 'react-redux';
import withAuthorization from '../Session/withAuthorization';
import withAuthentication from '../Session/withAuthentication';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';


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


/*const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>
*/

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      authUser: null,
      isOpen: false,
      username: null,
    };
  }
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({authUser}))
        : this.setState(() => ({authUser: null}));
    });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
 
        if (this.state.authUser) {
            return(
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
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      My name
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
                        Sign out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
            );
        } else {
           return(
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
        
        
    const mapStateToProps = (state) => ({
      authUser: state.sessionState.authUser,
    });
    
    export default connect(mapStateToProps)(NavBar);
