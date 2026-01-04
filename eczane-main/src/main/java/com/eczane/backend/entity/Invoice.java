package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Long invoiceId;

    @Column(name = "invoice_date", nullable = false)
    private LocalDate invoiceDate;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    // Her siparişin sadece BİR faturası olur (OneToOne)
    @OneToOne
    @JoinColumn(name = "order_id", unique = true, nullable = false)
    private ResultingOrder resultingOrder;
}