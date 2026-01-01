package com.eczane.backend.service;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.repository.MedicineRepository;
import jakarta.transaction.Transactional; // DİKKAT: Spring Framework değil jakarta olanı seçebilirsin veya spring olanı, spring önerilir.
import org.springframework.stereotype.Service;

@Service
public class SalesService {

    private final MedicineRepository medicineRepository;

    public SalesService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    /**
     * SATIŞ İŞLEMİ (Business Logic)
     * 1. İlacı bul.
     * 2. Stok kontrolü yap.
     * 3. Yeterliyse stoğu düş.
     * 4. Yeni hali kaydet.
     */
    @Transactional // Bu işlem sırasında bir hata olursa (elektrik kesilirse vb.) yapılan her şeyi geri al (Rollback).
    public void ilacSat(Long ilacId, int adet) {
        // 1. İlacı Veritabanından Çek
        Medicine ilac = medicineRepository.findById(ilacId)
                .orElseThrow(() -> new RuntimeException("İlaç bulunamadı!"));

        // 2. Stok Kontrolü
        if (ilac.getStockQuantity() < adet) {
            throw new RuntimeException("Yetersiz Stok! Mevcut: " + ilac.getStockQuantity());
        }

        // 3. Stoğu Düş
        int yeniStok = ilac.getStockQuantity() - adet;
        ilac.setStockQuantity(yeniStok);

        // 4. Veritabanına Güncelle
        medicineRepository.save(ilac);

        System.out.println(ilac.getName() + " satıldı. Kalan stok: " + yeniStok);
    }
}
