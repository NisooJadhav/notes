import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateNote from './CreateNote';
import Notes from './Notes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/create/notes" element={<Notes />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
