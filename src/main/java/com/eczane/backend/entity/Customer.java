package com.eczane.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true) // Person'daki alanları da dikkate al
@Entity
@Table(name = "customer")
@PrimaryKeyJoinColumn(name = "person_id") // Person tablosundaki ID ile eşleşir
public class Customer extends Person {

    @Column(name = "birth_date")
    private LocalDate birthDate;
}
