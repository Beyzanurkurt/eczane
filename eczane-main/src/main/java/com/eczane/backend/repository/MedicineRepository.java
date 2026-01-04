package com.eczane.backend.repository;

import com.eczane.backend.entity.Medicine;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;

// <Medicine, Long> -> Hangi tablo (Medicine) ve ID türü ne (Long)
public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    // Buraya hiçbir şey yazmasan bile save(), findAll(), delete() gibi metodların hazır!

    @Modifying
    @Transactional
    @Query(value = "CALL raise_medicine_price(:id, :amount)", nativeQuery = true)
    void zamYap(@Param("id") Integer id, @Param("amount") BigDecimal amount);
}
