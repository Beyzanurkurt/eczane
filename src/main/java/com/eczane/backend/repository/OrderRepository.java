package com.eczane.backend.repository;

import com.eczane.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

// <Order, Long> -> Hangi tablo (Order) ve ID türü ne (Long)
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Buraya hiçbir şey yazmasan bile save(), findAll(), delete() gibi metodların hazır!
}
