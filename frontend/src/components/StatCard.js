import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`} style={{ borderLeft: `5px solid ${color}` }}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
            </div>
            <div className="col-auto">
              {/* İkon buraya gelecek */}
              <div style={{ fontSize: '2rem', color: '#dddfeb' }}>
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;