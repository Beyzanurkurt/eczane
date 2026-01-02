import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]); // İlaçları tutacak kutu

  // Sayfa açıldığında çalışır
  useEffect(() => {
    // Backend'e istek at
    axios.get("http://localhost:8080/api/medicines")
      .then((response) => {
        // Gelen veriyi kutuya koy
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("Hata oluştu:", error);
      });
  }, []);

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white">
        <h4>İlaç Listesi</h4>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>İlaç Adı</th>
              <th>Fiyat</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((ilac) => (
              <tr key={ilac.medicineId}>
                <td>{ilac.medicineId}</td>
                <td>{ilac.name}</td>
                <td>{ilac.price} ₺</td>
                <td>
                  <span className={ilac.stockQuantity < 20 ? "badge bg-danger" : "badge bg-info"}>
                    {ilac.stockQuantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineList;