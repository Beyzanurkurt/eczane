package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data // Getter, Setter, toString metodlarını otomatik oluşturur
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    private String description;


}