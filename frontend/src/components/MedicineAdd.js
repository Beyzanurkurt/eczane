import React, { useState } from "react";
import axios from "axios";

const MedicineAdd = ({ onMedicineAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  // Kategori ID'sini değiştirebilmek için state (Varsayılan: 1)
  const [categoryId, setCategoryId] = useState(1); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const yeniIlac = {
      name: name,
      price: parseFloat(price),
      stockQuantity: parseInt(stock),
      // Kullanıcının seçtiği kategori ID'sini gönderiyoruz
      category: { categoryId: parseInt(categoryId) } 
    };

    axios.post("http://localhost:8080/api/medicines", yeniIlac)
      .then((response) => {
        alert("✅ İlaç Başarıyla Eklendi!");
        setName("");
        setPrice("");
        setStock("");
        setCategoryId(1); // Formu sıfırla
        if(onMedicineAdded) onMedicineAdded();
      })
      .catch((error) => {
        console.error("Ekleme Hatası:", error);
        alert("❌ Hata oluştu! Kategori ID geçerli mi?");
      });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-warning text-dark">
        <h5 className="mb-0">➕ Yeni İlaç Ekle</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label">İlaç Adı</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Fiyat (₺)</label>
              <input 
                type="number" 
                className="form-control" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-2 mb-3">
              <label className="form-label">Stok</label>
              <input 
                type="number" 
                className="form-control" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                required 
              />
            </div>
            {/* YENİ EKLENEN KISIM: Kategori ID Girişi */}
            <div className="col-md-2 mb-3">
              <label className="form-label">Kategori ID</label>
              <input 
                type="number" 
                className="form-control" 
                value={categoryId} 
                onChange={(e) => setCategoryId(e.target.value)} 
                required 
                min="1"
              />
            </div>
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">
                Kaydet
              </button>
            </div>
          </div>
          <small className="text-muted">Not: Veritabanında kayıtlı bir Kategori ID (Örn: 1 veya 2) girin.</small>
        </form>
      </div>
    </div>
  );
};

export default MedicineAdd;