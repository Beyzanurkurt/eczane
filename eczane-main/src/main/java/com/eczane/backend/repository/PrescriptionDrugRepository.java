package com.eczane.backend.repository;

import com.eczane.backend.entity.PrescriptionDrug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrescriptionDrugRepository extends JpaRepository<PrescriptionDrug, Long> {
}