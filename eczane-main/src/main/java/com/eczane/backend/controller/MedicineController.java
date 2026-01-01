package com.eczane.backend.controller;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.service.MedicineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Burası bir API kapısıdır
@RequestMapping("/api/medicines") // Bu adresten gelen isteklere bak
@CrossOrigin(origins = "http://localhost:3000") // React'in (3000 portu) buraya erişmesine izin ver
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    // GET İsteği: Tüm ilaçları listele
    // Adres: http://localhost:8080/api/medicines
    @GetMapping
    public List<Medicine> tumIlaclariGetir() {
        return medicineService.tumIlaclariGetir();
    }

    // POST İsteği: Yeni ilaç ekle
    // React'ten JSON verisi gelir, bunu Java nesnesine çevirip kaydeder
    @PostMapping
    public Medicine yeniIlacEkle(@RequestBody Medicine medicine) {
        return medicineService.ilacKaydet(medicine);
    }
}
