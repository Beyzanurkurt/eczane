import React, { useState } from 'react';
import axios from 'axios';

const ReceteIslemleri = () => {
  const [reçeteNo, setReçeteNo] = useState('');
  const [currentReçete, setCurrentReçete] = useState(null); // Başlangıçta boş (Mock yok!)
  const [hata, setHata] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- GERÇEK VERİ TABANI SORGUSU ---
  const sorgula = async (e) => {
    e.preventDefault();
    setHata(null);
    setCurrentReçete(null);
    setLoading(true);

    try {
      // Input boşsa uyarı ver
      if (!reçeteNo) {
        setHata("⚠️ Lütfen bir Reçete ID girin (Örn: 2)");
        setLoading(false);
        return;
      }

      // 1. JAVA BACKEND'E İSTEK AT (Veritabanına gider)
      const response = await axios.get(`http://localhost:8080/api/prescriptions/${reçeteNo}`);
      
      // 2. GELEN GERÇEK VERİYİ STATE'E KAYDET
      console.log("Veritabanından Gelen Veri:", response.data); // Konsoldan kontrol edebilirsin
      setCurrentReçete(response.data);

    } catch (error) {
      console.error("Hata Detayı:", error);
      setHata("❌ Reçete bulunamadı! (Veritabanında bu ID'li kayıt olduğundan emin olun)");
    } finally {
      setLoading(false);
    }
  };

  // --- TOPLAM TUTAR HESAPLAMA ---
  const toplamTutar = currentReçete && currentReçete.medicines 
    ? currentReçete.medicines.reduce((acc, satir) => {
        // satir: PrescriptionMedicine tablosu
        // satir.medicine: Medicine tablosu (İlaç detayları burada)
        const fiyat = satir.medicine ? satir.medicine.price : 0;
        return acc + (fiyat * satir.quantity);
      }, 0) 
    : 0;

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Reçete İşlemleri</h2>

      {/* 1. SORGULAMA FORMU */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <form onSubmit={sorgula} className="row g-3 align-items-center">
            <div className="col-auto">
              <label className="col-form-label fw-bold">Reçete ID:</label>
            </div>
            <div className="col-auto">
              <input 
                type="number" 
                className="form-control" 
                placeholder="Örn: 2"
                value={reçeteNo}
                onChange={(e) => setReçeteNo(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Veritabanına Bağlanıyor..." : "Sorgula"}
              </button>
            </div>
          </form>
          {hata && <div className="alert alert-danger mt-3">{hata}</div>}
        </div>
      </div>

      {/* 2. REÇETE VE İLAÇ LİSTESİ (Varsa Göster) */}
      {currentReçete && (
        <div className="row fade-in">
          
          {/* SOL: HASTA BİLGİLERİ */}
          <div className="col-md-4">
            <div className="card shadow-sm mb-3">
              <div className="card-header bg-info text-white fw-bold">
                 Hasta Bilgileri
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <small className="text-muted">Müşteri ID / Adı</small><br />
                  {/* Backend şimdilik sadece ID gönderiyor */}
                  <strong>Müşteri No: {currentReçete.customerId}</strong>
                </li>
                <li className="list-group-item">
                  <small className="text-muted">Doktor</small><br />
                  Doktor No: {currentReçete.doctorId}
                </li>
                <li className="list-group-item">
                  <small className="text-muted">Reçete Tarihi</small><br />
                  {currentReçete.date}
                </li>
              </ul>
            </div>
          </div>

          {/* SAĞ: İLAÇ TABLOSU */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between">
                <span> İlaç Listesi</span>
              </div>
              <div className="card-body p-0">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>İlaç Adı</th>
                      <th>Kullanım</th>
                      <th>Adet</th>
                      <th className="text-end">Birim Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* EN ÖNEMLİ KISIM: Veritabanındaki listeyi dönüyoruz */}
                    {currentReçete.medicines && currentReçete.medicines.map((satir) => (
                      <tr key={satir.id}>
                        {/* İlaç Adı (Ara tablodan -> Medicine tablosuna geçiş) */}
                        <td className="fw-bold text-primary">
                            {satir.medicine ? satir.medicine.name : 'Silinmiş İlaç'}
                        </td>
                        
                        {/* Kullanım Talimatı */}
                        <td>{satir.usageInstruction || 'Standart doz'}</td>

                        {/* Adet */}
                        <td>
                            <span className="badge bg-secondary" style={{fontSize: '1em'}}>
                                {satir.quantity}
                            </span>
                        </td>

                        {/* Fiyat */}
                        <td className="text-end">
                            {satir.medicine ? satir.medicine.price + ' ₺' : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-group-divider">
                    <tr>
                      <td colSpan="3" className="text-end fw-bold fs-5">TOPLAM:</td>
                      <td className="text-end fw-bold fs-5 text-success">
                        {toplamTutar.toFixed(2)} ₺
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="card-footer d-flex justify-content-end">
                 <button 
                    className="btn btn-success btn-lg" 
                    onClick={() => alert("Veritabanına Satış İşlendi! (Simülasyon)")}
                 >
                    Satışı Tamamla
                 </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ReceteIslemleri;