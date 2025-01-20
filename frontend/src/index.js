import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional: Add your custom styles here
import App from './App'; // Import the App component

// Rendering the App component to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
