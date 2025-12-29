package com.eczane.backend.repository;

import com.eczane.backend.entity.OrderMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

// <OrderMedicine, Long> -> Hangi tablo (OrderMedicine) ve ID türü ne (Long)
public interface OrderMedicineRepository extends JpaRepository<OrderMedicine, Long> {
    // Buraya hiçbir şey yazmasan bile save(), findAll(), delete() gibi metodların hazır!
}
