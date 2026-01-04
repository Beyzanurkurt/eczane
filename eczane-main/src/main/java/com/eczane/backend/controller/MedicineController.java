package com.eczane.backend.controller;

import com.eczane.backend.entity.Medicine;
import com.eczane.backend.service.MedicineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController // Burası bir API kapısıdır
@RequestMapping("/api/medicines") // Bu adresten gelen isteklere bak
//@CrossOrigin(origins = "http://localhost:3000") // React'in (3000 portu) buraya erişmesine izin ver
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    // GET İsteği: Tüm ilaçları listele
    //Adres: http://localhost:8080/api/medicines
    @GetMapping
    public List<Medicine> tumIlaclariGetir() {
        return medicineService.tumIlaclariGetir();
    }

    // POST İsteği: Yeni ilaç ekle
    // React'ten JSON verisi gelir, bunu Java nesnesine çevirip kaydeder
    @PostMapping
    public void yeniIlacEkle(@RequestBody Medicine medicine) {
         medicineService.ilacKaydet(medicine);
    }

    @PutMapping("/{id}/zam")
    public ResponseEntity<String> zamYap(@PathVariable Integer id, @RequestParam BigDecimal miktar) {
        medicineService.ilacaZamYap(id, miktar);
        return ResponseEntity.ok("İşlem Başarılı: İlacın fiyatı arttırıldı.");
    }
}
