import React from "react";
import App from "./App";


import {
    AuthProvider,
    AuthService,
} from 'react-oauth2-pkce'


const authService = new AuthService({
    clientId: 'web-ui',
    authorizeEndpoint: 'http://localhost:8090/realms/kucukdev/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:8090/realms/kucukdev/protocol/openid-connect/token',
    logoutEndpoint: 'http://localhost:8090/realms/kucukdev/protocol/openid-connect/logout',
    redirectUri: 'http://localhost:3000/',
    scopes: ['openid'],
});

function SecuredApp() {
    return (
        <AuthProvider authService={authService} >
            <App />
        </AuthProvider>
    );
}

export default SecuredApp;