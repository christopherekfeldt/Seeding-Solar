import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const SettingPage = ({ authUser }) =>
  <div>
    <center>
    <h4>Account: {authUser.email}</h4>
    <PasswordForgetForm />
    <PasswordChangeForm />
    </center>
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(SettingPage);
