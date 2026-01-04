package com.eczane.backend.controller;

import com.eczane.backend.entity.Prescription;
import com.eczane.backend.repository.PrescriptionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    private final PrescriptionRepository repository;

    public PrescriptionController(PrescriptionRepository repository) {
        this.repository = repository;
    }

    // DEĞİŞEN KISIM BURASI:
    @GetMapping("/{id}")
    public Prescription getPrescription(@PathVariable Long id) {
        // Artık veritabanındaki 'prescription_id' sütununa bakıyor (Senin '2' dediğin yer)
        Optional<Prescription> recete = repository.findById(id);
        
        if (recete.isPresent()) {
            return recete.get();
        } else {
            // Reçete bulunamazsa null dönelim veya hata fırlatalım
            throw new RuntimeException("Bu ID'ye sahip reçete bulunamadı: " + id);
        }
    }
}