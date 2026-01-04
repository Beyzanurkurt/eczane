package com.eczane.backend.entity;

import jakarta.persistence.*;

@Entity
public class PrescriptionItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String medicineName; // İlaç Adı
    private String usageInstruction; // Kullanım Şekli (2x1 Tok)
    private int quantity; // Adet
    private double price; // Fiyat

    // Getter Setter'lar...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMedicineName() { return medicineName; }
    public void setMedicineName(String medicineName) { this.medicineName = medicineName; }
    public String getUsageInstruction() { return usageInstruction; }
    public void setUsageInstruction(String usageInstruction) { this.usageInstruction = usageInstruction; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}