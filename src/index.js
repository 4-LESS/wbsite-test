// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';
import App from './App';
import './fontawesome';
import 'animate.css';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = "dev-jp48fg6le6uefxfo.us.auth0.com";
const clientId = "LgyPR73uOrh7zOIHK26RBfu8XKAf1lro";

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope: "openid profile email", // Agrega los scopes necesarios
    }}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>
);