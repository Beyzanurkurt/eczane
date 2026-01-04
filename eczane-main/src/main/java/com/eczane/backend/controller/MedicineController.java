package com.eczane.backend.controller;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.service.MedicineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines") // Tarayıcıdaki adresimiz bu olacak
@CrossOrigin(origins = "http://localhost:3000") // React'in portu (genelde 3000) için izin ver
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    // GET İsteği: Tüm ilaçları getir
    // Adres: http://localhost:8080/api/medicines
    @GetMapping
    public List<Medicine> tumIlaclariGetir() {
        return medicineService.tumIlaclariGetir();
    }
    
    // POST İsteği: Yeni ilaç ekle (Arkadaşının kullanacağı kısım)
    @PostMapping
    public void ilacEkle(@RequestBody Medicine medicine) {
        medicineService.ilacKaydet(medicine);
    }
}