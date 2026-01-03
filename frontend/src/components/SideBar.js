import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // YENİ
import { FaHome, FaBox, FaFilePrescription, FaShoppingCart, FaChartBar, FaUsers, FaCog, FaPlusSquare } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation(); // Hangi sayfadayız anlamak için

  // Aktif menüyü boyamak için yardımcı fonksiyon
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar shadow-sm">
      <div className="sidebar-brand mb-4">
        <FaPlusSquare className="text-success me-2" size={28} />
        <span>Eczane Yönetim Sistemi</span>
      </div>
      
      <div className="nav flex-column sidebar-menu">
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <FaHome /> Dashboard
        </Link>
        <Link to="/stok" className={`nav-link ${isActive('/stok')}`}>
          <FaBox /> Stok Takibi
        </Link>
        <Link to="/recete" className={`nav-link ${isActive('/recete')}`}>
          <FaFilePrescription /> Reçete İşlemleri
        </Link>
        <Link to="/satislar" className={`nav-link ${isActive('/satislar')}`}>
          <FaShoppingCart /> Satışlar
        </Link>
        <Link to="/raporlar" className={`nav-link ${isActive('/raporlar')}`}>
          <FaChartBar /> Raporlar
        </Link>
        <Link to="/musteriler" className={`nav-link ${isActive('/musteriler')}`}>
          <FaUsers /> Müşteriler
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;