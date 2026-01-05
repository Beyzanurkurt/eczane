package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "otc_drug")
@PrimaryKeyJoinColumn(name = "medicine_id")
public class OtcDrug extends Medicine {

    @Column(name = "age_limit")
    private Integer ageLimit;
}