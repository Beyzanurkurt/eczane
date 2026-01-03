import React from 'react';

const KPICard = ({ title, value, subtext, icon, color }) => {
  // Renk kodlarına göre CSS sınıfları (Bootstrap renkleri)
  const bgColors = {
    success: 'bg-success', // Yeşil
    primary: 'bg-primary', // Mavi
    warning: 'bg-warning', // Turuncu
    danger: 'bg-danger'    // Kırmızı
  };

  return (
    <div className="col-md-3 mb-4">
      <div className={`card text-white shadow h-100 py-2 ${bgColors[color]}`} style={{ borderRadius: '15px' }}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            
            {/* İkon Kısmı */}
            <div className="col-auto me-3">
              <div style={{ fontSize: '2.5rem', opacity: 0.8 }}>
                {icon}
              </div>
            </div>

            {/* Yazı Kısmı */}
            <div className="col">
              <div className="text-uppercase font-weight-bold" style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {title}
              </div>
              <div className="h3 mb-0 font-weight-bold">
                {value}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {subtext}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;