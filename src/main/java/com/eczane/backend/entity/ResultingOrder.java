package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "resulting_order")
@PrimaryKeyJoinColumn(name = "order_id")
public class ResultingOrder extends Order {

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    private String status; // 'Hazırlanıyor', 'Tamamlandı' vs.

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "doctor_id") // Doktor zorunlu değil (Reçetesiz ilaç olabilir)
    private Doctor doctor;
}