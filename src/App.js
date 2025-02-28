import React from "react";
import theme from "./Theme.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Login from './Login'; // Import Login component
import MiniDrawer from "./Home"
import DashboardLayoutBasic from "./Home"

function App() {
  return (
    /**
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MiniDrawer />} />
      </Routes>
    </Router>
    **/
    <DashboardLayoutBasic />


  );
}

export default App;

