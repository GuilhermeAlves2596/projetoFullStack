import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RickAndMortyProvider } from './context/RickAndMortyContext';
import SignInSide from './pages/SignInside';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RickAndMortyProvider> {/*Context.API*/}
        <RootComponent />
      </RickAndMortyProvider>
    </AuthProvider>
  </React.StrictMode>
);

function RootComponent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <App /> : <SignInSide />;
}

reportWebVitals();