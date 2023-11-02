import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RickAndMortyProvider } from './context/RickAndMortyContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <RickAndMortyProvider> {/*Context.API*/}
      <App />
    </RickAndMortyProvider>
  </React.StrictMode>
);

reportWebVitals();