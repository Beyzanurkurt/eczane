package com.eczane.backend.controller;

import com.eczane.backend.entity.ResultingOrder;
import com.eczane.backend.service.OrderService;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // SATIŞ YAPMA API'si
    // Adres: http://localhost:8080/api/orders/satis
    @PostMapping("/satis")
    public ResultingOrder satisYap(@RequestBody SatisIstegi istek) {
        return orderService.satisYap(
                istek.getCustomerId(), 
                istek.getMedicineIds(), 
                istek.getQuantities()
        );
    }

    // React'ten gelecek veri paketi modeli (DTO)
    // Sadece veri taşımak için kullanılır, veritabanında karşılığı yoktur.
    @Data
    public static class SatisIstegi {
        private Long customerId;
        private List<Long> medicineIds;
        private List<Integer> quantities;
    }
}