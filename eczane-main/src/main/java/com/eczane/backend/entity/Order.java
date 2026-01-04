package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "orders") // 'order' SQL'de özel kelime olduğu için 'orders' yaptık
@Inheritance(strategy = InheritanceType.JOINED)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    private String status;          // Durum (Tedarik Edildi vs.)
    private java.math.BigDecimal totalAmount; // Toplam Tutar
    private Long supplierId;        // Tedarikçi ID


}
