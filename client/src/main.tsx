import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppContextProvider } from './context/AppContext';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      {/* Wrapping the App with AppContextProvider to provide context to the entire app */}
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  );
} else {
  throw new Error("Root element not found");
}
