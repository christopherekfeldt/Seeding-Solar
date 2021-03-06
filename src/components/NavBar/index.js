import React from 'react';
import {firebase, auth} from '../../firebase';
import { connect } from 'react-redux';
import * as realFirebase from 'firebase';

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



class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);


    this.state = {
      authUser: null,
      isOpen: false,
      username: ''
    };
  }

  //Takes out username from the logged in user
  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){
        
        this.setState({authUser});
        let uid = realFirebase.auth().currentUser.uid;
        
        firebase.db.ref('users/' + uid).once('value').then(function(snapshot) {
         var username = (snapshot.val() && snapshot.val().username);
         this.setState({username});
        }.bind(this));
      } else {
        this.setState({authUser : null})
      }
    });
  }

  //Checks if user is logged in, if so, u can scroll down and use special funcions.
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
        //Checks if user is logged in, if so show code under.
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
                    <NavLink href="/Aboutus/"><h4>About Us</h4></NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/Projects/"><h4>Projects</h4></NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <h4>{this.state.username}</h4>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <NavLink href="/settings/">Settings</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                      <NavLink href="/Account/">My Account</NavLink>
                      </DropdownItem>
                      <DropdownItem divider />

                      <DropdownItem>
                        <NavLink onClick={auth.doSignOut}>Sign Out </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
            );
          // If user is not logged in, show this
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
                    <NavLink href="/AboutUs/"><h4>About Us</h4></NavLink>
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
