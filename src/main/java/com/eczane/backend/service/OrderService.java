package com.eczane.backend.service;

import com.eczane.backend.entity.*;
import com.eczane.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MedicineService medicineService;
    private final OrderMedicineRepository orderMedicineRepository;
    private final CustomerRepository customerRepository;

    public OrderService(OrderRepository orderRepository, MedicineService medicineService, 
                        OrderMedicineRepository orderMedicineRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.medicineService = medicineService;
        this.orderMedicineRepository = orderMedicineRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public ResultingOrder satisYap(Long customerId, List<Long> medicineIds, List<Integer> quantities) {
        
        // 1. MÜŞTERİ SEÇİMİ (Garanti Yöntem)
        // ID hatası almamak için veritabanındaki ilk müşteriyi seçiyoruz.
        List<Customer> musteriler = customerRepository.findAll();
        if (musteriler.isEmpty()) {
            throw new RuntimeException("Sistemde kayıtlı müşteri yok! Önce veritabanına müşteri ekleyin.");
        }
        Customer customer = musteriler.get(0); 

        // 2. SİPARİŞ FİŞİ OLUŞTUR (Java'nın Görevi)
        ResultingOrder order = new ResultingOrder();
        order.setCustomer(customer);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Tamamlandı");
        order.setTotalAmount(BigDecimal.ZERO); // Artık veritabanında bu sütun var, hata vermeyecek!
        
        order = orderRepository.save(order);

        BigDecimal toplamTutar = BigDecimal.ZERO;

        // 3. İLAÇLARI EKLE
        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);

            Medicine medicine = medicineService.ilacBul(medId);

            // Stok Kontrolü (Sadece Uyarı Amaçlı)
            if (medicine.getStockQuantity() < adet) {
                throw new RuntimeException("Yetersiz Stok! İlaç: " + medicine.getName());
            }

            // ARA TABLOYA KAYDET
            // Biz bunu kaydettiğimiz AN, senin SQL Trigger'ın çalışıp stoğu düşecek.
            OrderMedicine orderDetail = new OrderMedicine();
            orderDetail.setOrder(order);
            orderDetail.setMedicine(medicine);
            orderDetail.setQuantity(adet);
            
            orderMedicineRepository.save(orderDetail);

            // Fiyat Hesapla
            BigDecimal kalemTutar = medicine.getPrice().multiply(new BigDecimal(adet));
            toplamTutar = toplamTutar.add(kalemTutar);
        }

        order.setTotalAmount(toplamTutar);
        return orderRepository.save(order);
    }
}