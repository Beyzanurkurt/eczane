import React from 'react';

const LowStockList = ({ ilaclar }) => {
  // Sadece stoğu 20'den az olanları filtrele ve ilk 5 tanesini al
  const kritikIlaclar = ilaclar
    .filter(ilac => ilac.stockQuantity < 20)
    .slice(0, 5);

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-white border-bottom-warning">
        <h6 className="m-0 font-weight-bold text-warning">⚠️ Kritik Stoklar</h6>
      </div>
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          
          {kritikIlaclar.map((ilac) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={ilac.medicineId}>
              <div>
                <span className="fw-bold text-dark">{ilac.name}</span>
                <div className="small text-muted">Fiyat: {ilac.price} ₺</div>
              </div>
              <span className="badge bg-danger rounded-pill px-3 py-2">
                {ilac.stockQuantity} Adet
              </span>
            </li>
          ))}

          {kritikIlaclar.length === 0 && (
            <li className="list-group-item text-center text-muted py-4">
              Harika! Kritik seviyede ilaç yok. 🎉
            </li>
          )}

        </ul>
      </div>
      <div className="card-footer text-center bg-white small">
        <a href="#" className="text-secondary text-decoration-none">Tüm Stokları Gör &rarr;</a>
      </div>
    </div>
  );
};

export default LowStockList;