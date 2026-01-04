package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "incoming_order")
@Data // <-- setSupplierId hatasını çözer
@EqualsAndHashCode(callSuper = true)
@PrimaryKeyJoinColumn(name = "order_id")
public class IncomingOrder extends Order {

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_order_code")
    private String supplierOrderCode;
}