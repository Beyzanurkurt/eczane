package com.eczane.backend.entity; // PAKET İSMİ EKLENDİ (İlk hatan buydu)

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "prescription") // Veritabanındaki tablo adın
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prescription_id") // Veritabanındaki PK (Primary Key) adın
    private Long id;

    @Column(name = "prescription_date") // Veritabanındaki tarih sütunu
    private LocalDate date;

    @Column(name = "customer_id") // Hata veren customerId değişkeninin karşılığı
    private Long customerId;

    @Column(name = "doctor_id") // Hata veren doctorId değişkeninin karşılığı
    private Long doctorId;

    // İlişki: Bir reçetenin içindeki ilaçlar
    @OneToMany(mappedBy = "prescription", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PrescriptionMedicine> medicines;

    // --- GETTER VE SETTERLAR ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public List<PrescriptionMedicine> getMedicines() { return medicines; }
    public void setMedicines(List<PrescriptionMedicine> medicines) { this.medicines = medicines; }
}