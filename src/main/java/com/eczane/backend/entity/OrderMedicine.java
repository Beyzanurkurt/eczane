package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_medicine")
public class OrderMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Senin SQL'deki "id INT GENERATED..." sütunu

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    @Column(nullable = false)
    private Integer quantity;
};