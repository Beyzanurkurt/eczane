package com.eczane.backend.repository;

import com.eczane.backend.entity.IncomingOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomingOrderRepository extends JpaRepository<IncomingOrder, Long> {
}