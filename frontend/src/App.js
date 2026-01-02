import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ilaclar, setIlaclar] = useState([]);

  // Verileri Çek
  const fetchIlaclar = () => {
    axios.get('http://localhost:8080/api/medicines')
      .then(response => setIlaclar(response.data))
      .catch(error => console.error("Veri Çekme Hatası:", error));
  };

  useEffect(() => {
    fetchIlaclar();
  }, []);

  // --- SATIŞ YAP FONKSİYONU ---
  const satisYap = (ilacId, ilacAdi) => {
    
    // Veritabanındaki Müşteri ID'si (Bunu 60 olarak belirlemiştik)
    const MUSTERI_ID = 60; 

    const satisPaketi = {
      customerId: MUSTERI_ID,
      medicineIds: [ilacId], 
      quantities: [1]      
    };

    axios.post('http://localhost:8080/api/orders/satis', satisPaketi)
      .then(response => {
        alert(`✅ SATIŞ BAŞARILI!\n\nSatılan: ${ilacAdi}\nFatura Tutarı: ${response.data.totalAmount} ₺`);
        fetchIlaclar(); // Stokları güncellemek için listeyi yenile
      })
      .catch(error => {
        console.error("Satış Hatası:", error);
        alert("❌ HATA: Satış yapılamadı. Stok yetersiz olabilir veya veritabanı bağlantısı koptu.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🛒 Hızlı Satış Ekranı</h2>
      
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>İlaç Adı</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th className="text-center">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ilaclar.map(ilac => (
                <tr key={ilac.medicineId}>
                  <td>{ilac.medicineId}</td>
                  <td className="fw-bold">{ilac.name}</td>
                  <td>{ilac.price} ₺</td>
                  <td>
                    {ilac.stockQuantity < 10 
                      ? <span className="badge bg-danger">{ilac.stockQuantity} (Kritik)</span> 
                      : <span className="badge bg-success">{ilac.stockQuantity}</span>
                    }
                  </td>
                  <td className="text-center">
                    <button 
                        className="btn btn-primary btn-sm px-4"
                        onClick={() => satisYap(ilac.medicineId, ilac.name)}
                        disabled={ilac.stockQuantity <= 0}
                    >
                        Satış Yap 💰
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;