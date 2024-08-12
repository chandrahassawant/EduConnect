import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
// import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import store from './store'; // Import your Redux store


const root = createRoot(document.getElementById('root'));

root.render(
  // <Provider store={store}> {/* Provide Redux store to your application */}
    <Auth0Provider
      domain="dev-gmvmoko7nu1rps2b.us.auth0.com"
      clientId="WUMcDvNYy8aWO9ovaloASpiODIgCTPc5"
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: "https://dev-gmvmoko7nu1rps2b.us.auth0.com/api/v2/",
        // scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  // </Provider>,
);
