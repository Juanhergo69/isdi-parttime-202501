import React from 'react'
import '../index.css'

const LandingPage = ({ navigation }) => {
    return (
        <div className="landingContainer">
            <img src="/Logo.jpg" className="landingImg" alt="Logo" />
            <h3 className="landingMsg">Welcome to your social developer network</h3>
            <button
                className="buttonJoin"
                onClick={navigation.navigateToRegister}
            >
                Join In!
            </button>
        </div>
    );
};

export default LandingPage


