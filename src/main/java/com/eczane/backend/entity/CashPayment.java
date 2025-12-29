package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "cash_payment")
@PrimaryKeyJoinColumn(name = "payment_id")
public class CashPayment extends Payment {
    // Nakit ödemede ekstra tutulacak bir bilgi yok, 
    // sadece ödemenin "Nakit" tipinde olduğunu belirtmek için bu sınıf var.
}
