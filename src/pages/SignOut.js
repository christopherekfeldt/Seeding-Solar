import React from 'react';
import {auth} from '../firebase';

const SignOutButton = () =>
    <div>
        <center>
            <button
                type="button"
                onClick={auth.doSignOut}
            >
                Sign Out
            </button>
        </center>
    </div>

export default SignOutButton;