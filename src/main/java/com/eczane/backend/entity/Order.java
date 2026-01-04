package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data; // BU ÇOK ÖNEMLİ! Getter/Setter'ları bu oluşturur.
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "orders")
@Data // <-- BU SATIR EKSİKSE "setTotalAmount" ÇALIŞMAZ
@Inheritance(strategy = InheritanceType.JOINED) // Miras alma stratejisi
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId; // Veya Long, projene göre

    @Column(name = "order_date")
    private LocalDate orderDate;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;

    @Column(name = "status")
    private String status;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate tedarikTarihi;     
    // İlişki varsa (Customer vb.) buradadır
}