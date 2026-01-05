package com.eczane.backend.service;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.repository.MedicineRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    // Tüm ilaçları getir (React listelesin diye)
    public List<Medicine> tumIlaclariGetir() {
        return medicineRepository.findAll();
    }

    // ID ile tek bir ilaç bul (Satış yaparken lazım olacak)
    public Medicine ilacBul(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("İlaç bulunamadı!"));
    }

    // İlaç kaydetme/güncelleme (Stok düştüğünde burayı kullanacağız)
    public void ilacKaydet(Medicine medicine) {
        medicineRepository.save(medicine);
    }

    @Transactional // Bu çok önemli! Prosedürler transactional çalışmak ister.
    public void ilacaZamYap(Integer id, BigDecimal zamMiktari) {
        medicineRepository.zamYap(id, zamMiktari);
    }
}