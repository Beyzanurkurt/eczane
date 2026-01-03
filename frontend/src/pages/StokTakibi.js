import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaTruck } from 'react-icons/fa';

const StokTakibi = () => {
  const [ilaclar, setIlaclar] = useState([]);
  
  // --- MODAL KONTROLLERİ ---
  const [yeniIlacFormAcik, setYeniIlacFormAcik] = useState(false);
  const [tedarikFormAcik, setTedarikFormAcik] = useState(false); // Yeni Tedarik Modalı

  // --- FORM DATALARI ---
  // 1. Yeni İlaç Tanımlama Verisi
  const [ilacData, setIlacData] = useState({ name: '', price: '', stockQuantity: '', categoryId: 1 });
  const [aktifIlac, setAktifIlac] = useState(null); // Düzenleme için

  // 2. Tedarik Girişi Verisi (SENARYO İÇİN YENİ)
  const [tedarikData, setTedarikData] = useState({
    supplierId: 101, // SQL'de eklediğimiz "Hedef Ecza Deposu" ID'si
    supplierOrderCode: '',
    items: [{ medicineId: '', quantity: '' }] // Dinamik satırlar
  });

  // --- VERİLERİ ÇEK ---
  const fetchIlaclar = () => {
    axios.get('http://localhost:8080/api/medicines')
      .then(res => setIlaclar(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchIlaclar();
  }, []);

  // ==========================================================
  // 1. İŞLEM: YENİ İLAÇ TANIMLAMA (CRUD)
  // ==========================================================
  const handleIlacKaydet = (e) => {
    e.preventDefault();
    const veri = {
      name: ilacData.name,
      price: parseFloat(ilacData.price),
      stockQuantity: parseInt(ilacData.stockQuantity),
      category: { categoryId: parseInt(ilacData.categoryId) }
    };

    if (aktifIlac) { // Güncelleme
      axios.put(`http://localhost:8080/api/medicines/${aktifIlac.medicineId}`, veri)
        .then(() => { alert("Güncellendi!"); formlariKapat(); })
        .catch(err => console.error(err));
    } else { // Ekleme
      axios.post('http://localhost:8080/api/medicines', veri)
        .then(() => { alert("İlaç Tanımlandı!"); formlariKapat(); })
        .catch(err => console.error(err));
    }
  };

  const handleSil = (id) => {
    if (window.confirm("Silmek istediğine emin misin?")) {
      axios.delete(`http://localhost:8080/api/medicines/${id}`)
        .then(() => { alert("Silindi!"); fetchIlaclar(); })
        .catch(() => alert("Hata! Bu ilaç işlem gördüğü için silinemez."));
    }
  };

  // ==========================================================
  // 2. İŞLEM: TEDARİK GİRİŞİ (SUPPLY / INCOMING ORDER)
  // ==========================================================
  
  // Tedarik formuna yeni satır ekle
  const satirEkle = () => {
    setTedarikData({
      ...tedarikData,
      items: [...tedarikData.items, { medicineId: '', quantity: '' }]
    });
  };

  // Satırdaki veriyi güncelle
  const satirGuncelle = (index, field, value) => {
    const yeniItems = [...tedarikData.items];
    yeniItems[index][field] = value;
    setTedarikData({ ...tedarikData, items: yeniItems });
  };

  // Backend'e Gönder
  const handleTedarikKaydet = (e) => {
    e.preventDefault();

    // Veriyi Backend'in istediği formata çevir (Parallel Arrays)
    const requestData = {
      supplierId: tedarikData.supplierId,
      supplierOrderCode: tedarikData.supplierOrderCode,
      medicineIds: tedarikData.items.map(i => parseInt(i.medicineId)),
      quantities: tedarikData.items.map(i => parseInt(i.quantity))
    };

    axios.post('http://localhost:8080/api/orders/tedarik', requestData)
      .then(() => {
        alert("✅ Mal Kabulü Başarılı! Stoklar Güncellendi.");
        formlariKapat();
      })
      .catch(err => {
        console.error(err);
        alert("❌ Tedarik işlemi başarısız. Konsolu kontrol et.");
      });
  };

  // ==========================================================
  // YARDIMCILAR
  // ==========================================================
  const formlariKapat = () => {
    setYeniIlacFormAcik(false);
    setTedarikFormAcik(false);
    setAktifIlac(null);
    setIlacData({ name: '', price: '', stockQuantity: '', categoryId: 1 });
    setTedarikData({ supplierId: 101, supplierOrderCode: '', items: [{ medicineId: '', quantity: '' }] });
    fetchIlaclar();
  };

  const formAcIlac = (ilac = null) => {
    setTedarikFormAcik(false); // Diğerini kapat
    if (ilac) {
      setAktifIlac(ilac);
      setIlacData({
        name: ilac.name,
        price: ilac.price,
        stockQuantity: ilac.stockQuantity,
        categoryId: ilac.category ? ilac.category.categoryId : 1
      });
    } else {
      setAktifIlac(null);
      setIlacData({ name: '', price: '', stockQuantity: '', categoryId: 1 });
    }
    setYeniIlacFormAcik(true);
  };

  const formAcTedarik = () => {
    setYeniIlacFormAcik(false); // Diğerini kapat
    setTedarikFormAcik(true);
  };

  return (
    <div className="container-fluid">
      
      {/* BAŞLIK VE BUTONLAR */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gray-800">📦 Stok Yönetimi</h2>
        <div>
          <button className="btn btn-primary shadow-sm me-2" onClick={() => formAcTedarik()}>
            <FaTruck className="me-2" /> Tedarik Girişi (Mal Kabul)
          </button>
          <button className="btn btn-success shadow-sm" onClick={() => formAcIlac()}>
            <FaPlus className="me-2" /> Yeni İlaç Tanımla
          </button>
        </div>
      </div>

      {/* --- 1. FORM: YENİ İLAÇ TANIMLAMA --- */}
      {yeniIlacFormAcik && (
        <div className="card shadow mb-4 border-left-success">
          <div className="card-header py-3 d-flex justify-content-between">
            <h6 className="m-0 font-weight-bold text-success">{aktifIlac ? 'İlaç Düzenle' : 'Yeni İlaç Kartı'}</h6>
            <button className="btn btn-sm btn-light" onClick={formlariKapat}><FaTimes /></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleIlacKaydet}>
              <div className="row">
                <div className="col-md-4 mb-2"><input placeholder="İlaç Adı" className="form-control" value={ilacData.name} onChange={e => setIlacData({...ilacData, name: e.target.value})} required /></div>
                <div className="col-md-2 mb-2"><input placeholder="Fiyat" type="number" className="form-control" value={ilacData.price} onChange={e => setIlacData({...ilacData, price: e.target.value})} required /></div>
                <div className="col-md-2 mb-2"><input placeholder="Başlangıç Stok" type="number" className="form-control" value={ilacData.stockQuantity} onChange={e => setIlacData({...ilacData, stockQuantity: e.target.value})} required /></div>
                <div className="col-md-2 mb-2">
                   <select className="form-select" value={ilacData.categoryId} onChange={e => setIlacData({...ilacData, categoryId: e.target.value})}>
                     <option value="1">Ağrı Kesici</option><option value="2">Antibiyotik</option><option value="3">Vitamin</option>
                   </select>
                </div>
                <div className="col-md-2"><button type="submit" className="btn btn-success w-100">Kaydet</button></div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- 2. FORM: TEDARİK GİRİŞİ (SENARYO) --- */}
      {tedarikFormAcik && (
        <div className="card shadow mb-4 border-left-primary">
          <div className="card-header py-3 d-flex justify-content-between bg-light">
            <h6 className="m-0 font-weight-bold text-primary">🚛 Tedarikçi Mal Kabul İşlemi</h6>
            <button className="btn btn-sm btn-light" onClick={formlariKapat}><FaTimes /></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleTedarikKaydet}>
              {/* Üst Bilgiler */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>Tedarikçi Firma</label>
                  <select className="form-select" disabled>
                    <option value="101">Hedef Ecza Deposu A.Ş.</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label>İrsaliye / Sipariş No</label>
                  <input type="text" className="form-control" placeholder="Örn: IRS-2026-001" 
                    value={tedarikData.supplierOrderCode}
                    onChange={e => setTedarikData({...tedarikData, supplierOrderCode: e.target.value})}
                    required
                  />
                </div>
              </div>

              {/* İlaç Satırları */}
              <label className="mb-2 fw-bold">Gelen Ürünler</label>
              {tedarikData.items.map((item, index) => (
                <div className="row mb-2" key={index}>
                  <div className="col-md-6">
                    <select className="form-select" required
                      value={item.medicineId}
                      onChange={e => satirGuncelle(index, 'medicineId', e.target.value)}
                    >
                      <option value="">İlaç Seçiniz...</option>
                      {ilaclar.map(ilac => (
                        <option key={ilac.medicineId} value={ilac.medicineId}>{ilac.name} (Mevcut: {ilac.stockQuantity})</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="Gelen Adet" required
                      value={item.quantity}
                      onChange={e => satirGuncelle(index, 'quantity', e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    {index === tedarikData.items.length - 1 && (
                      <button type="button" className="btn btn-secondary w-100" onClick={satirEkle}>+ Satır</button>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-3 text-end">
                <button type="submit" className="btn btn-primary px-4">Mal Kabulünü Tamamla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- STOK LİSTESİ TABLOSU --- */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-gray-800">Mevcut Envanter</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr><th>ID</th><th>İlaç Adı</th><th>Fiyat</th><th>Stok</th><th>İşlem</th></tr>
              </thead>
              <tbody>
                {ilaclar.map((ilac) => (
                  <tr key={ilac.medicineId}>
                    <td>{ilac.medicineId}</td>
                    <td className="fw-bold">{ilac.name}</td>
                    <td>{ilac.price} ₺</td>
                    <td>
                      <span className={`badge ${ilac.stockQuantity < 20 ? 'bg-danger' : 'bg-success'}`}>
                        {ilac.stockQuantity} Adet
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => formAcIlac(ilac)}><FaEdit /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleSil(ilac.medicineId)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StokTakibi;