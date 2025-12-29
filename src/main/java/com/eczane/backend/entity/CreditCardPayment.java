package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "credit_card_payment")
@PrimaryKeyJoinColumn(name = "payment_id")
public class CreditCardPayment extends Payment {

    @Column(name = "card_type")
    private String cardType; // Visa, MasterCard vb.

    @Column(name = "card_last4", length = 4)
    private String cardLast4; // Kartın son 4 hanesi
}