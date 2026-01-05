package com.eczane.backend.repository;

import com.eczane.backend.entity.Order; // Entity adını kontrol et (ResultingOrder da olabilir, Order da)
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface OrderRepository extends JpaRepository<Order, Long> { // ID tipi Integer veya Long olabilir, kontrol et
    
    // Belirli bir tarihteki tamamlanmış satışların toplam tutarını getirir
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o WHERE o.orderDate = :date AND o.status = 'Tamamlandı'")
    BigDecimal gunlukCiroGetir(@Param("date") LocalDate date);
    // src/main/java/com/eczane/backend/repository/OrderRepository.java

@Query("SELECT COUNT(o) FROM ResultingOrder o WHERE o.status IN ('Bekliyor', 'Hazırlanıyor')")
long bekleyenReceteSayisi();
}