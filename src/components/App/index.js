import React from 'react';
import {BrowserRouter as Router,Route,} from 'react-router-dom';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import ProjectPage from '../Projects';
import AboutUsPage from '../AboutUs';
import SettingsPage from '../Settings/settings';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import NavBar from '../NavBar';
import './index.css';
import Footer from '../Footer';

//Renders some parts of all pages like Footer, Navbar and sets Routes for every link to their specific page.
const App = () =>
  <Router>
    <div className="app">
      <div className = "Site-content">
        <div className = "App-header">
         <NavBar />
        </div>
        <div className = "App-main">
        <hr/>
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
          <Route exact path={routes.PROJECTS} component={() => <ProjectPage />} />
          <Route exact path={routes.ABOUTUS} component={() => <AboutUsPage />} />
          <Route exact path={routes.SETTINGS} component={() => <SettingsPage />} />
        <hr/>
        </div>
      </div>
    <Footer />
    </div>
  </Router>

export default withAuthentication(App);