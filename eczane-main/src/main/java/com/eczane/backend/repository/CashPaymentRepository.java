package com.eczane.backend.repository;

import com.eczane.backend.entity.CashPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CashPaymentRepository extends JpaRepository<CashPayment, Long> {
}