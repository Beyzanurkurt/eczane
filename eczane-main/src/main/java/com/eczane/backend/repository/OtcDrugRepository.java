package com.eczane.backend.repository;

import com.eczane.backend.entity.OtcDrug;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtcDrugRepository extends JpaRepository<OtcDrug, Long> {
}