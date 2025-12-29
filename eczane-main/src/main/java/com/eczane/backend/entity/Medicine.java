package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "medicine")
@Inheritance(strategy = InheritanceType.JOINED)
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Long medicineId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal price; // Para birimleri için her zaman BigDecimal kullanılır!

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    // Kategori ile İlişki: Bir İlaç bir Kategoriye aittir.
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}