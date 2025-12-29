package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "supplier")
@PrimaryKeyJoinColumn(name = "person_id")
public class Supplier extends Person {

    @Column(name = "company_name")
    private String companyName;
}
