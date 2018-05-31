import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

//The settings page for a user
//Here the user can change password
const SettingPage = ({ authUser }) =>
  <div>
    <center>
    <h4>Account: {authUser.email}</h4>
    <PasswordChangeForm />
    </center>
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});
//Can only be accessed by users that are signed in
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(SettingPage);
