package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "pharmacist")
@PrimaryKeyJoinColumn(name = "employee_id")
public class Pharmacist extends Employee {

    @Column(name = "license_number", nullable = false)
    private String licenseNumber;
}