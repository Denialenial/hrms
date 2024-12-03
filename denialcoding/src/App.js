import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Dashboard from './pages/Dashboard';
import StaffInfoPage from './pages/StaffInfoPage';
import DevelopmentPage from './pages/DevelopmentPage';
import ProcurementPage from './pages/ProcurementPage';

function App() {
    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/staff-info" element={<StaffInfoPage />} />
                    <Route path="/development" element={<DevelopmentPage />} />
                    <Route path="/procurement" element={<ProcurementPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
