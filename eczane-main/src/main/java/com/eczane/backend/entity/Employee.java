package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "employee")
@Inheritance(strategy = InheritanceType.JOINED) // Pharmacist ve Cashier buradan türeyecek
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    private String phone;

    private BigDecimal salary; // Para birimi her zaman BigDecimal

    // İLİŞKİ: Bir çalışan bir şubede çalışır.
    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private PharmacyBranch pharmacyBranch;
}