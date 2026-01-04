package com.eczane.backend.repository;

import com.eczane.backend.entity.CreditCardPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardPaymentRepository extends JpaRepository<CreditCardPayment, Long> {
}