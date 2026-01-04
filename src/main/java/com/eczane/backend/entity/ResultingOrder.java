package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "resulting_order")
@Data
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "order_id")
public class ResultingOrder extends Order {

    @Column(name = "customer_id")
    private Long customerId;
    
    // Doktor vb. eklenebilir
}