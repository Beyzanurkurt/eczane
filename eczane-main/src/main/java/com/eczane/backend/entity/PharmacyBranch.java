package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pharmacy_branch")
public class PharmacyBranch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_id")
    private Long branchId;

    @Column(name = "branch_name", nullable = false)
    private String branchName;

    private String address;
    private String city;
    private String phone;
}