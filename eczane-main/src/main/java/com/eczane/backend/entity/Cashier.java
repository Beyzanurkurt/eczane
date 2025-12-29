package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "cashier")
@PrimaryKeyJoinColumn(name = "employee_id")
public class Cashier extends Employee {

    private String shift; // 'Sabah', 'Akşam' vb.
}
