import React from 'react';
import axios from 'axios';

const MedicineTable = ({ ilaclar, onSatisYap }) => {

const zamYap = async (id) => {
    const miktar = prompt("Bu ilaca kaç TL zam yapmak istiyorsunuz?");
    if (miktar) {
        try {
            // 9090 yerine 8080 yazıyoruz
            await axios.put(`http://localhost:8080/api/medicines/${id}/zam?miktar=${miktar}`);
            alert("Başarılı! Fiyat güncellendi.");
            window.location.reload();
        } catch (error) {
            console.error("Hata:", error);
            alert("Zam yapılamadı! Backend açık mı?");
        }
    }
};
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3 bg-white">
        <h6 className="m-0 font-weight-bold text-primary">💊 İlaç Listesi ve Hızlı Satış</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-hover" width="100%" cellSpacing="0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>İlaç Adı</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th>Durum</th>
                <th className="text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ilaclar.map((ilac) => (
                <tr key={ilac.medicineId}>
                  <td>{ilac.medicineId}</td>
                  <td className="fw-bold">{ilac.name}</td>
                  <td>{ilac.price} ₺</td>
                  <td>
                    {ilac.stockQuantity}
                    {ilac.stockQuantity < 20 && <span className="text-danger small ms-1">(Az)</span>}
                  </td>
                  <td>
                    {ilac.stockQuantity < 10 ? (
                      <span className="badge bg-danger">Kritik</span>
                    ) : (
                      <span className="badge bg-success">Yeterli</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-primary btn-sm rounded-pill px-3"
                      onClick={() => onSatisYap(ilac.medicineId)}
                      disabled={ilac.stockQuantity <= 0}
                    >
                      💸 Satış Yap
                    </button>
                    <button
                        className="btn btn-warning btn-sm rounded-pill px-3 ms-2" // ms-2: Soldan boşluk bırakır
                        onClick={() => zamYap(ilac.medicineId)}
                      >
                        💰 Zam Yap
                      </button>
                  </td>
                </tr>
              ))}
              
              {ilaclar.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-3">
                    Kayıtlı ilaç bulunamadı veya yükleniyor...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;