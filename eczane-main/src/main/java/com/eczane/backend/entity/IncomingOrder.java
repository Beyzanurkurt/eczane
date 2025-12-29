package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "incoming_order")
@PrimaryKeyJoinColumn(name = "order_id")
public class IncomingOrder extends Order {

    @Column(name = "supplier_order_code")
    private String supplierOrderCode;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "branch_id", nullable = false)
    private PharmacyBranch pharmacyBranch;
}