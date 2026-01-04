import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';
// Bileşenler
import Sidebar from './components/SideBar';
import Header from './components/Header';

// Sayfalar
import Dashboard from './pages/Dashboard';
import StokTakibi from './pages/StokTakibi';
import ReceteIslemleri from './pages/ReceteIslemleri';

function App() {
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 3 saniye (3000 ms) sonra loading'i false yap
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Temizlik
  }, []);

  // 3. Eğer hala loading true ise SADECE Splash'i göster
  if (loading) {
    return <SplashScreen />;
  }
  
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
              <Route path="/recete" element={<div className="p-4"><ReceteIslemleri /></div>} />
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