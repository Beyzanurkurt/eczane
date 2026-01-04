package com.eczane.backend.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "prescription_medicine") // Veritabanındaki tablo adın
public class PrescriptionMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tablonda 'quantity' sütunu var
    @Column(name = "quantity")
    private int quantity;

    // Tablonda 'customer_id' sütunu var (Resimde gördüm)
    @Column(name = "customer_id")
    private Long customerId;

    // Hangi Reçete? (prescription_id ile bağlanır)
    @ManyToOne
    @JoinColumn(name = "prescription_id")
    @JsonIgnore // Sonsuz döngüyü engeller
    private Prescription prescription;

    // Hangi İlaç? (medicine_id ile bağlanır)
    // DİKKAT: Projende Medicine entity'si olduğunu varsayıyorum.
    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    // --- GETTER VE SETTERLAR ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Prescription getPrescription() { return prescription; }
    public void setPrescription(Prescription prescription) { this.prescription = prescription; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }
}