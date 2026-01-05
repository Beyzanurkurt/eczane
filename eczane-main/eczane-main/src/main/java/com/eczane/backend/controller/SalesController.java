package com.eczane.backend.controller;

import com.eczane.backend.service.SalesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:3000")
public class SalesController {

    private final SalesService salesService;

    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    // POST İsteği: Satış Yap
    // Adres: http://localhost:8080/api/sales?ilacId=1&adet=2
    @PostMapping
    public ResponseEntity<String> satisYap(@RequestParam Long ilacId, @RequestParam int adet) {
        try {
            salesService.ilacSat(ilacId, adet);
            return ResponseEntity.ok("Satış başarıyla gerçekleşti.");
        } catch (Exception e) {
            // Hata olursa (stok yetersiz vb.) 400 Bad Request dön
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
