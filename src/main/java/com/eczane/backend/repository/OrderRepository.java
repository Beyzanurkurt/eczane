package com.eczane.backend.repository;

import com.eczane.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.time.LocalDate;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    // --- DÜZELTİLEN SORGU ---
    // HATA ÇÖZÜMÜ: 'CURRENT_DATE' yerine ':date' parametresini geri koyduk.
    // Artık döngü hangi günü sorarsa (Pzt, Sal, Çar...) O GÜNÜN cirosunu verecek.
    
    @Query(value = "SELECT COALESCE(SUM(o.total_amount), 0) " +
                   "FROM orders o " +
                   "INNER JOIN resulting_order ro ON o.order_id = ro.order_id " +
                   "WHERE o.order_date = :date AND o.status = 'Tamamlandı'", 
           nativeQuery = true)
    BigDecimal gunlukCiroGetir(@Param("date") LocalDate date);

    // Bekleyen Reçeteler
    @Query(value = "SELECT COUNT(*) FROM resulting_order WHERE status IN ('Bekliyor', 'Hazırlanıyor')", 
           nativeQuery = true)
    long bekleyenReceteSayisi();
}