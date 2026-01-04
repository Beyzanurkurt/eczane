package com.eczane.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode
@Embeddable // Bu sınıfın bir anahtar parçası olduğunu belirtir
public class OrderMedicineKey implements Serializable {

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "medicine_id")
    private Long medicineId;
}