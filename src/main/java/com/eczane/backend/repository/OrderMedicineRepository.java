package com.eczane.backend.repository;

import com.eczane.backend.entity.OrderMedicine;
import org.springframework.data.jpa.repository.JpaRepository;

// ID türü Long oldu
public interface OrderMedicineRepository extends JpaRepository<OrderMedicine, Long> {
}