package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "prescription_drug")
@PrimaryKeyJoinColumn(name = "medicine_id")
public class PrescriptionDrug extends Medicine {

    @Column(name = "prescription_required")
    private Boolean prescriptionRequired = true;
}