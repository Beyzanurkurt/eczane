import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Bileşenler
import Sidebar from './components/SideBar';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      {/* 1. Sol Menü */}
      <Sidebar />

      {/* 2. Üst Bar */}
      <Header />

      {/* 3. Ana İçerik Alanı (Şimdilik boş, sonra dolduracağız) */}
      <div className="main-content">
        <h3 className="text-secondary">Hoş Geldiniz 👋</h3>
        <p className="text-muted">Buraya istatistik kartları ve grafikler gelecek.</p>
        
        {/* Test Amaçlı Boşluk */}
        <div style={{height: '1000px'}}></div>
      </div>
    </div>
  );
}

export default App;