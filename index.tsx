
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Fix: Converted truncated and redundant index.tsx into a standard application entry point.
// This resolves the syntax errors and properly initializes the SocioRural application.
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
