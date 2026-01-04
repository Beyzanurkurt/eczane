import React from 'react';
import { FaSearch, FaBell, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="top-header">
      {/* Arama Çubuğu */}
      <div className="d-flex align-items-center bg-light rounded-pill px-3 py-1">
        <FaSearch className="text-muted" />
        <input 
          type="text" 
          className="form-control border-0 bg-transparent shadow-none" 
          placeholder="Ara..." 
        />
      </div>

      {/* Sağ Taraf: Bildirimler ve Profil */}
      <div className="profile-section">
        <div className="icon-btn">
          <FaBell />
          <span className="badge bg-danger rounded-circle badge-notify">3</span>
        </div>
        <div className="icon-btn">
          <FaQuestionCircle />
        </div>
        
        <div className="d-flex align-items-center ms-3">
            <div className="text-end me-2 d-none d-lg-block">
                <span className="d-block small fw-bold text-dark">Beyza Nur</span>
                <span className="d-block small text-muted">Eczacı</span>
            </div>
            <FaUserCircle size={35} className="text-secondary" />
        </div>
      </div>
    </div>
  );
};

export default Header;