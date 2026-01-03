import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// İkonlar
import { FaBoxes, FaShoppingCart, FaFilePrescription, FaExclamationCircle } from 'react-icons/fa';

// Bileşenler

import KPICard from '../components/KPICard';
import SalesChart from '../components/SalesChart';
import LowStockList from '../components/LowStockList';
import MedicineTable from '../components/MedicineTable';

const Dashboard = () => {
  const [ilaclar, setIlaclar] = useState([]);
  const [grafikVerisi, setGrafikVerisi] = useState([]); // Yeni State
  const [bekleyenRecete, setBekleyenRecete] = useState(0); // YENİ STATE

  // --- TÜM VERİLERİ ÇEK ---
  const verileriGuncelle = () => {
    // 1. İlaçları Çek
    axios.get('http://localhost:8080/api/medicines')
      .then(res => setIlaclar(res.data))
      .catch(err => console.error(err));

    // 2. Grafik Verisini Çek (YENİ)
    axios.get('http://localhost:8080/api/orders/weekly-stats')
      .then(res => setGrafikVerisi(res.data))
      .catch(err => console.error("Grafik Hatası:", err));
  };
    axios.get('http://localhost:8080/api/orders/bekleyen-sayisi')
      .then(res => setBekleyenRecete(res.data))
      .catch(err => console.error("Bekleyen Sayısı Hatası:", err));
  ;

  useEffect(() => {
    verileriGuncelle();
  }, []);

  // --- SATIŞ YAP FONKSİYONU (Backend'e Bağlı) ---
  const satisYap = (ilacId) => {
    const satisPaketi = { customerId: 60, medicineIds: [ilacId], quantities: [1] };
    axios.post('http://localhost:8080/api/orders/satis', satisPaketi)
      .then(res => {
        alert("Satış Başarılı! ✅");
        verileriGuncelle(); // Grafik ve Stok anında güncellensin!
      })
      .catch(err => alert("Hata!"));
  };

  const toplamStok = ilaclar.reduce((acc, ilac) => acc + ilac.stockQuantity, 0);
  const kritikStokSayisi = ilaclar.filter(ilac => ilac.stockQuantity < 20).length;
  // Günlük ciroyu grafikten alabiliriz (Bugünün verisi, listenin son elemanı)
  const gunlukSatis = grafikVerisi.length > 0 ? grafikVerisi[grafikVerisi.length - 1].satis : 0;
    return (
    <div className="App">
       
       <div className="main-content">
        
        {/* ... Başlık ... */}
        
        {/* KPI KARTLARI (Günlük satışı artık gerçek veriden alıyor!) */}
        <div className="row">
            
            <KPICard title="Günlük Satışlar" value={`${gunlukSatis} ₺`} subtext="Bugünkü ciro" icon={<FaShoppingCart />} color="primary" />
            <KPICard title="Toplam Stok" value={`${toplamStok} Ürün`} subtext="Depodaki anlık durum" icon={<FaBoxes />} color="success" />
            <KPICard title="Bekleyen Reçeteler" value={`${bekleyenRecete} Adet`} subtext="Hızlı işlem gerekli" icon={<FaFilePrescription />} color="warning" />
            <KPICard title="Kritik Stoklar" value={`${kritikStokSayisi} Ürün`} subtext="Acil sipariş verilmeli" icon={<FaExclamationCircle />} color="danger" />
             {/* ... Diğer kartlar ... */}
        </div>

        <div className="row mt-4">
          <div className="col-lg-8">
            {/* GRAFİĞE VERİYİ GÖNDERİYORUZ */}
            <SalesChart data={grafikVerisi} />
          </div>
          <div className="col-lg-4">
            <LowStockList ilaclar={ilaclar} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <MedicineTable ilaclar={ilaclar} onSatisYap={satisYap} />
          </div>
        </div>

      </div>
    </div>
  );

}
export default Dashboard;