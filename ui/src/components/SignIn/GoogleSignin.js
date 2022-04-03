import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { withRouter } from "react-router-dom";
 
const GooglePanelInner = props => {
 
    const responseGoogle = (googleUser) => {
            console.log(JSON.stringify(googleUser));
            const idToken = googleUser.getAuthResponse().id_token;
            const googleEmail = googleUser.profileObj.email;
            console.log('The id_token is ' + idToken)
            localStorage.setItem('idToken', idToken);
            localStorage.setItem('googleEmail', googleEmail);
            //props.history.push(props.onLogin);
        };

        return (
	            <GoogleLogin
	                clientId="105844715068481158478"
	                buttonText="Login with Google"
	                onSuccess={responseGoogle}
	                onFailure={responseGoogle}
	                cookiePolicy={'single_host_origin'}
	            />
	       );
}
 
export const GooglePanelInner
