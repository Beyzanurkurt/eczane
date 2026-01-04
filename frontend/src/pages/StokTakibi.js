import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus, FaTimes, FaTruck, FaExclamationTriangle } from 'react-icons/fa';
import CustomAlert from '../components/CustomAlert';

const StokTakibi = () => {
  const [ilaclar, setIlaclar] = useState([]);
  
  // --- STATE'LER ---
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null }); // SİLME ONAY KUTUSU

  const [yeniIlacFormAcik, setYeniIlacFormAcik] = useState(false);
  const [tedarikFormAcik, setTedarikFormAcik] = useState(false);

  const [ilacData, setIlacData] = useState({ name: '', price: '', stockQuantity: '', categoryId: 1 });
  const [aktifIlac, setAktifIlac] = useState(null);
  const [tedarikData, setTedarikData] = useState({
    supplierId: 101, // SQL'deki Tedarikçi ID'si
    supplierOrderCode: '',
    items: [{ medicineId: '', quantity: '' }]
  });

  // --- YARDIMCILAR ---
  const showAlert = (message, type = 'success') => {
    setAlertInfo({ show: true, message, type });
  };
  const closeAlert = () => setAlertInfo({ ...alertInfo, show: false });

  const fetchIlaclar = () => {
    axios.get('http://localhost:8080/api/medicines')
      .then(res => setIlaclar(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchIlaclar();
  }, []);

  // ==========================================================
  // 1. SİLME İŞLEMİ (ARTIK ORTADA ÇIKACAK)
  // ==========================================================
  
  // Sil butonuna basınca direkt silme, ONAY KUTUSUNU AÇ
  const handleSilClick = (id) => {
    setDeleteModal({ show: true, id });
  };

  // Onay kutusunda "EVET" denirse burası çalışır
  const confirmDelete = () => {
    const id = deleteModal.id;
    axios.delete(`http://localhost:8080/api/medicines/${id}`)
      .then(() => { 
        showAlert("İlaç başarıyla silindi.", "success"); 
        setDeleteModal({ show: false, id: null });
        fetchIlaclar(); 
      })
      .catch((err) => {
        setDeleteModal({ show: false, id: null });
        // Veritabanı hatasını kullanıcıya açıkla
        console.error(err);
        showAlert("BU İLAÇ SİLİNEMEZ! Çünkü geçmiş satışlarda veya tedarik kayıtlarında kullanılmış.", "error"); 
      });
  };

  // ==========================================================
  // 2. İLAÇ EKLEME / GÜNCELLEME
  // ==========================================================
  const handleIlacKaydet = (e) => {
    e.preventDefault();
    const veri = {
      name: ilacData.name,
      price: parseFloat(ilacData.price),
      stockQuantity: parseInt(ilacData.stockQuantity),
      category: { categoryId: parseInt(ilacData.categoryId) }
    };

    if (aktifIlac) {
      axios.put(`http://localhost:8080/api/medicines/${aktifIlac.medicineId}`, veri)
        .then(() => { showAlert("İlaç güncellendi!"); formlariKapat(); })
        .catch(() => showAlert("Güncelleme hatası!", "error"));
    } else {
      axios.post('http://localhost:8080/api/medicines', veri)
        .then(() => { showAlert("İlaç tanımlandı!"); formlariKapat(); })
        .catch(() => showAlert("Kayıt hatası!", "error"));
    }
  };

  // ==========================================================
  // 3. TEDARİK GİRİŞİ (LOGLU VE GARANTİ)
  // ==========================================================
  const handleTedarikKaydet = (e) => {
    e.preventDefault();
    
    // Verileri sayıya çevirdiğimizden emin olalım
    const requestData = {
      supplierId: parseInt(tedarikData.supplierId),
      supplierOrderCode: tedarikData.supplierOrderCode,
      medicineIds: tedarikData.items.map(i => parseInt(i.medicineId)),
      quantities: tedarikData.items.map(i => parseInt(i.quantity))
    };

    console.log("Gönderilen Veri:", requestData); // Hata ayıklama için konsola bas

    axios.post('http://localhost:8080/api/orders/tedarik', requestData)
      .then(() => {
        showAlert("✅ Mal Kabul Başarılı! Stoklar arttı.");
        formlariKapat();
      })
      .catch(err => {
        console.error("Tedarik Hatası:", err);
        showAlert("Tedarik kaydedilemedi! Konsolu kontrol et.", "error");
      });
  };

  // --- FORM YARDIMCILARI ---
  const satirEkle = () => {
    setTedarikData({ ...tedarikData, items: [...tedarikData.items, { medicineId: '', quantity: '' }] });
  };
  const satirGuncelle = (index, field, value) => {
    const yeniItems = [...tedarikData.items];
    yeniItems[index][field] = value;
    setTedarikData({ ...tedarikData, items: yeniItems });
  };
  const formlariKapat = () => {
    setYeniIlacFormAcik(false); setTedarikFormAcik(false); setAktifIlac(null);
    setIlacData({ name: '', price: '', stockQuantity: '', categoryId: 1 });
    setTedarikData({ supplierId: 101, supplierOrderCode: '', items: [{ medicineId: '', quantity: '' }] });
    fetchIlaclar();
  };
  const formAcIlac = (ilac = null) => {
    setTedarikFormAcik(false);
    if (ilac) {
      setAktifIlac(ilac);
      setIlacData({ name: ilac.name, price: ilac.price, stockQuantity: ilac.stockQuantity, categoryId: ilac.category?.categoryId || 1 });
    } else {
      setAktifIlac(null);
      setIlacData({ name: '', price: '', stockQuantity: '', categoryId: 1 });
    }
    setYeniIlacFormAcik(true);
  };

  return (
    <div className="container-fluid">
      <CustomAlert show={alertInfo.show} message={alertInfo.message} type={alertInfo.type} onClose={closeAlert} />

      {/* --- SİLME ONAY MODALI (EKRAN ORTASI) --- */}
      {deleteModal.show && (
        <div style={styles.overlay}>
          <div className="card shadow-lg p-4 text-center" style={{ maxWidth: '400px', width: '90%', borderRadius: '15px' }}>
            <div className="mb-3 text-warning"><FaExclamationTriangle size={50} /></div>
            <h5 className="font-weight-bold">Emin misiniz?</h5>
            <p className="text-muted">Bu ilacı silmek üzeresiniz. Bu işlem geri alınamaz.</p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary" onClick={() => setDeleteModal({ show: false, id: null })}>Vazgeç</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Evet, Sil</button>
            </div>
          </div>
        </div>
      )}

      {/* --- BAŞLIK VE BUTONLAR --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gray-800">📦 Stok Yönetimi</h2>
        <div>
          <button className="btn btn-primary shadow-sm me-2" onClick={() => { setYeniIlacFormAcik(false); setTedarikFormAcik(true); }}>
            <FaTruck className="me-2" /> Tedarik Girişi
          </button>
          <button className="btn btn-success shadow-sm" onClick={() => formAcIlac()}>
            <FaPlus className="me-2" /> Yeni İlaç Tanımla
          </button>
        </div>
      </div>

      {/* --- FORMLAR (AYNI KALDI) --- */}
      {yeniIlacFormAcik && (
        <div className="card shadow mb-4 border-left-success">
          <div className="card-header py-3 d-flex justify-content-between">
             <h6 className="text-success font-weight-bold">{aktifIlac ? 'Düzenle' : 'Yeni İlaç'}</h6>
             <button className="btn btn-light btn-sm" onClick={formlariKapat}><FaTimes /></button>
          </div>
          <div className="card-body">
            <form onSubmit={handleIlacKaydet}>
                <div className="row">
                    <div className="col-md-4 mb-2"><input className="form-control" placeholder="Ad" value={ilacData.name} onChange={e=>setIlacData({...ilacData, name:e.target.value})} required/></div>
                    <div className="col-md-2 mb-2"><input type="number" className="form-control" placeholder="Fiyat" value={ilacData.price} onChange={e=>setIlacData({...ilacData, price:e.target.value})} required/></div>
                    <div className="col-md-2 mb-2"><input type="number" className="form-control" placeholder="Stok" value={ilacData.stockQuantity} onChange={e=>setIlacData({...ilacData, stockQuantity:e.target.value})} required/></div>
                    <div className="col-md-2 mb-2">
                        <select className="form-select" value={ilacData.categoryId} onChange={e=>setIlacData({...ilacData, categoryId:e.target.value})}>
                            <option value="1">Ağrı Kesici</option><option value="2">Antibiyotik</option><option value="3">Vitamin</option>
                        </select>
                    </div>
                    <div className="col-md-2"><button className="btn btn-success w-100">Kaydet</button></div>
                </div>
            </form>
          </div>
        </div>
      )}

      {tedarikFormAcik && (
        <div className="card shadow mb-4 border-left-primary">
          <div className="card-header py-3 d-flex justify-content-between">
             <h6 className="text-primary font-weight-bold">Tedarik Girişi</h6>
             <button className="btn btn-light btn-sm" onClick={formlariKapat}><FaTimes /></button>
          </div>
          <div className="card-body">
             <form onSubmit={handleTedarikKaydet}>
                <div className="row mb-3">
                    <div className="col-md-6"><label>Tedarikçi</label><select className="form-select" disabled><option>Hedef Ecza Deposu</option></select></div>
                    <div className="col-md-6"><label>Sipariş No</label><input className="form-control" required value={tedarikData.supplierOrderCode} onChange={e=>setTedarikData({...tedarikData, supplierOrderCode:e.target.value})}/></div>
                </div>
                {tedarikData.items.map((item, i) => (
                    <div className="row mb-2" key={i}>
                        <div className="col-md-6">
                            <select className="form-select" required value={item.medicineId} onChange={e=>satirGuncelle(i, 'medicineId', e.target.value)}>
                                <option value="">Seçiniz...</option>
                                {ilaclar.map(ilac=><option key={ilac.medicineId} value={ilac.medicineId}>{ilac.name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4"><input type="number" className="form-control" placeholder="Adet" required value={item.quantity} onChange={e=>satirGuncelle(i, 'quantity', e.target.value)}/></div>
                        <div className="col-md-2">{i===tedarikData.items.length-1 && <button type="button" className="btn btn-secondary w-100" onClick={satirEkle}>+</button>}</div>
                    </div>
                ))}
                <div className="text-end mt-3"><button className="btn btn-primary">Kaydet</button></div>
             </form>
          </div>
        </div>
      )}

      {/* --- TABLO --- */}
      <div className="card shadow mb-4">
        <div className="card-body">
            <table className="table table-bordered table-hover">
                <thead className="table-light"><tr><th>ID</th><th>İlaç</th><th>Fiyat</th><th>Stok</th><th>İşlem</th></tr></thead>
                <tbody>
                    {ilaclar.map(ilac => (
                        <tr key={ilac.medicineId}>
                            <td>{ilac.medicineId}</td>
                            <td>{ilac.name}</td>
                            <td>{ilac.price} ₺</td>
                            <td><span className={`badge ${ilac.stockQuantity<20?'bg-danger':'bg-success'}`}>{ilac.stockQuantity}</span></td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={()=>formAcIlac(ilac)}><FaEdit/></button>
                                <button className="btn btn-danger btn-sm" onClick={()=>handleSilClick(ilac.medicineId)}><FaTrash/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000
  }
};

export default StokTakibi;