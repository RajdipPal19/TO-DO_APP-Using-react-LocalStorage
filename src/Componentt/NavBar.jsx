// Navbar.jsx
import React, { useState } from 'react';
import './NavBar.css';
import profileAvatar from './resume.png';
import logo from './logo.png'; 

function Navbar({ handleBackgroundChange }) {
    const [showBackgroundSwitcher, setShowBackgroundSwitcher] = useState(false);

    const handleToggleBackgroundSwitcher = () => {
        setShowBackgroundSwitcher(!showBackgroundSwitcher);
    };

    const handleImageClick = (imageUrl) => {
        handleBackgroundChange(imageUrl); 
        setShowBackgroundSwitcher(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            handleBackgroundChange(reader.result);
            setShowBackgroundSwitcher(false);
        };
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleAddImage = () => {
        document.getElementById('file-input').click();
    };

    return (
        <nav className="navbar navbar-expand-lg " >
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src={profileAvatar} alt="User Avatar" className="profile-avatar" />
                    <span className="profile-name">Rajdip Pal</span>
                </div>
                <button className="navbar-toggler" type="button" onClick={handleToggleBackgroundSwitcher}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${showBackgroundSwitcher ? 'show' : ''}`}>
                    <div className="navbar-logo">
                        <img src={logo} alt="Logo" className="logo-img" />
                        <span className="navbar-title" onClick={handleRefresh} title='Click to Refresh the Page'>Activity Log</span>
                    </div>
                    <div className="navbar-nav ms-auto">
                    <label htmlFor="backgroundImage" className="btn btn-outline-dark rounded-pill me-2 font-weight-bold">
                            Customize
                            <input type="file" id="backgroundImage" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
