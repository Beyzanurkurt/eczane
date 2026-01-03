import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Bileşenler
import Sidebar from './components/SideBar';
import Header from './components/Header';

// Sayfalar
import Dashboard from './pages/Dashboard';
import StokTakibi from './pages/StokTakibi';

function App() {
  return (
    <Router>
      <div className="App d-flex"> {/* d-flex: Ekranı yan yana dizer */}
        
        {/* SOL TARA: MENÜ */}
        <Sidebar />

        {/* SAĞ TARAF: HEADER + İÇERİK (Wrapper) */}
        <div className="content-wrapper">
          
          {/* Üst Bar */}
          <Header />

          {/* Değişen Sayfa İçeriği */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stok" element={<StokTakibi />} />
              
              {/* Diğer Rotalar */}
              <Route path="/recete" element={<div className="p-4">🚧 Reçete Sayfası</div>} />
              <Route path="/satislar" element={<div className="p-4">🚧 Satışlar Sayfası</div>} />
              <Route path="/raporlar" element={<div className="p-4">🚧 Raporlar Sayfası</div>} />
              <Route path="/musteriler" element={<div className="p-4">🚧 Müşteriler Sayfası</div>} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;