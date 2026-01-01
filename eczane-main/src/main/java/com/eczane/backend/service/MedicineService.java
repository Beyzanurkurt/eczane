package com.eczane.backend.service;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // Spring'e bunun bir İş Mantığı sınıfı olduğunu söyler
public class MedicineService {

    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    // Tüm ilaçları getir
    public List<Medicine> tumIlaclariGetir() {
        return medicineRepository.findAll();
    }

    // Yeni ilaç kaydet veya güncelle
    public Medicine ilacKaydet(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // İlaç sil
    public void ilacSil(Long id) {
        medicineRepository.deleteById(id);
    }

    // ID ile tek bir ilaç bul
    public Medicine ilacBul(Long id) {
        return medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("İlaç bulunamadı!"));
    }
}
