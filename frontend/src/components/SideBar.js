import React from 'react';
import { FaHome, FaBox, FaFilePrescription, FaShoppingCart, FaChartBar, FaUsers, FaCog, FaPlusSquare } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar shadow-sm">
      <div className="sidebar-brand mb-4">
        <FaPlusSquare className="text-success me-2" size={28} />
        <span>Eczane Yönetim</span>
      </div>
      
      <div className="nav flex-column sidebar-menu">
        <a href="#" className="nav-link active">
          <FaHome /> Dashboard
        </a>
        <a href="#" className="nav-link">
          <FaBox /> Stok Takibi
        </a>
        <a href="#" className="nav-link">
          <FaFilePrescription /> Reçete İşlemleri
        </a>
        <a href="#" className="nav-link">
          <FaShoppingCart /> Satışlar
        </a>
        <a href="#" className="nav-link">
          <FaChartBar /> Raporlar
        </a>
        <a href="#" className="nav-link">
          <FaUsers /> Müşteriler
        </a>
        <div className="mt-4 border-top pt-2">
            <a href="#" className="nav-link">
            <FaCog /> Ayarlar
            </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;