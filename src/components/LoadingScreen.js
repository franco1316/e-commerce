import React from 'react';
import '../styles/loadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className = 'loading-screen'>
            <div className = "lds-ripple external">
                <div className = 'external'>
                    <div></div>
                    <h2 className = "internal">Loading...</h2>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;