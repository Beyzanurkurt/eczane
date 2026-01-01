import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ilaclar, setIlaclar] = useState([]);

  // Sayfa açılınca Backend'den verileri çek
  useEffect(() => {
    axios.get('http://localhost:8080/api/medicines')
      .then(response => {
        setIlaclar(response.data);
      })
      .catch(error => console.error("Hata:", error));
  }, []);

  // Satış Butonuna Basınca Çalışacak Fonksiyon
  const satisYap = (id) => {
    // Backend'deki Satış API'sine istek atıyoruz (1 adet sat)
    axios.post(`http://localhost:8080/api/sales?ilacId=${id}&adet=1`)
      .then(response => {
        alert("✅ " + response.data);
        window.location.reload(); // Sayfayı yenile ki stok güncellensin
      })
      .catch(error => {
        alert("❌ Hata: " + (error.response ? error.response.data : "Bilinmeyen hata"));
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">💊 Eczane Satış Ekranı</h2>
      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>İlaç Adı</th>
                <th>Fiyat</th>
                <th>Stok</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ilaclar.map(ilac => (
                <tr key={ilac.medicineId}>
                  <td>{ilac.medicineId}</td>
                  <td>{ilac.name}</td>
                  <td>{ilac.price} ₺</td>
                  <td>
                    <span className={`badge ${ilac.stockQuantity < 10 ? 'bg-danger' : 'bg-success'}`}>
                      {ilac.stockQuantity}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => satisYap(ilac.medicineId)}
                    >
                      Satış Yap (1 Adet)
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