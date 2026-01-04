import React from 'react';
import './SplashScreen.css'; // Birazdan oluşturacağız

const SplashScreen = () => {
    return (
        <div className="splash-screen">
            <div className="splash-content">
                {/* Buraya Eczane Logosu veya İkonu Gelecek */}
                <div className="logo-container">
                    <h1>💊 ECZANE SİSTEMİ</h1>
                    <p>Yükleniyor...</p>
                </div>
                
                {/* Dönen Yükleme Çubuğu (Spinner) */}
                <div className="spinner"></div>
            </div>
        </div>
    );
};

export default SplashScreen;