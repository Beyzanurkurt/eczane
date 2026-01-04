package com.eczane.backend.controller;

import com.eczane.backend.entity.IncomingOrder;
import com.eczane.backend.entity.ResultingOrder;
import com.eczane.backend.repository.OrderRepository; // EKSİK OLAN IMPORT BU!
import com.eczane.backend.service.OrderService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // Frontend ile konuşma izni
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository; // 1. BURADA TANIMLADIK

    // 2. CONSTRUCTOR (YAPICI METOT) İÇİNE EKLEDİK
    public OrderController(OrderService orderService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    // --- Satış Endpoint'i ---
    @PostMapping("/satis")
    public ResultingOrder satisYap(@RequestBody SatisRequest request) {
        return orderService.satisYap(request.getCustomerId(), request.getMedicineIds(), request.getQuantities());
    }

    // --- Yeni: Haftalık Satış İstatistiği ---
    @GetMapping("/weekly-stats")
    public List<Map<String, Object>> getHaftalikSatis() {
        List<Map<String, Object>> veriListesi = new ArrayList<>();
        LocalDate bugun = LocalDate.now();
        
        // Son 7 günü hesapla
        for (int i = 6; i >= 0; i--) {
            LocalDate tarih = bugun.minusDays(i);
            
            // Veritabanından o günün cirosunu çek (Null gelirse 0 yap)
            BigDecimal ciro = orderRepository.gunlukCiroGetir(tarih);
            if (ciro == null) {
                ciro = BigDecimal.ZERO;
            }
            
            // Gün ismini al (Örn: "Pzt") - Locale Uyarısı Düzeltildi
            String gunIsmi = tarih.getDayOfWeek()
                                  .getDisplayName(TextStyle.SHORT, Locale.forLanguageTag("tr-TR"));

            Map<String, Object> gunVerisi = new HashMap<>();
            gunVerisi.put("name", gunIsmi);
            gunVerisi.put("satis", ciro);
            
            veriListesi.add(gunVerisi);
        }
        return veriListesi;
    }

    // DTO (Veri Transfer Objesi) - Satış isteği için
    @Data
    static class SatisRequest {
        private Long customerId;
        private List<Long> medicineIds;
        private List<Integer> quantities;
    }

    @GetMapping("/bekleyen-sayisi")
    public long getBekleyenSayisi() {
    return orderRepository.bekleyenReceteSayisi();
}

   @PostMapping("/tedarik")
    public IncomingOrder tedarikGirisi(@RequestBody TedarikRequest request) {
        return orderService.stokEkle(
            request.getSupplierId(), 
            request.getMedicineIds(), 
            request.getQuantities(), 
            request.getSupplierOrderCode()
        );
    }

    // DTO Sınıfı (Aynı dosyanın en altına)
    @Data
    static class TedarikRequest {
        private Long supplierId;
        private List<Long> medicineIds;
        private List<Integer> quantities;
        private String supplierOrderCode;
    }
}