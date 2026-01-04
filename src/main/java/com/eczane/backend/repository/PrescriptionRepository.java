package com.eczane.backend.repository;

import com.eczane.backend.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    // Burası boş kalsın, JpaRepository zaten ID ile bulmayı (findById) kendi içinde barındırır.
}