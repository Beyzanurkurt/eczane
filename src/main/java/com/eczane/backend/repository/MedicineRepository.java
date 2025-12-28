package com.eczane.backend.repository;

import com.eczane.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

// <Medicine, Long> -> Hangi tablo (Medicine) ve ID türü ne (Long)
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    // Buraya hiçbir şey yazmasan bile save(), findAll(), delete() gibi metodların hazır!
}
