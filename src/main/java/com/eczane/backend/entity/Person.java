package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "person")
@Inheritance(strategy = InheritanceType.JOINED) // Kritik Nokta: Tabloların ayrı olduğunu belirtir
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id")
    private Long personId;

    @Column(nullable = false)
    private String name;

    private String phone;
    private String email;
    private String address;
}
