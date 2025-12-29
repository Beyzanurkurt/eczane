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

    private final OrderRepository orderRepository; // Bunu oluşturmadıysak ResultingOrderRepository de olur
    private final MedicineService medicineService;
    private final OrderMedicineRepository orderMedicineRepository; // Ara tablo repository'si
    private final CustomerRepository customerRepository;

    public OrderService(OrderRepository orderRepository, MedicineService medicineService, 
                        OrderMedicineRepository orderMedicineRepository, CustomerRepository customerRepository) {
        this.orderRepository = orderRepository;
        this.medicineService = medicineService;
        this.orderMedicineRepository = orderMedicineRepository;
        this.customerRepository = customerRepository;
    }

    // SATIŞ YAPMA METODU
    @Transactional // Ya hep ya hiç! Hata çıkarsa stok düşmeyi iptal eder.
    public ResultingOrder satisYap(Long customerId, List<Long> medicineIds, List<Integer> quantities) {
        
        // 1. Müşteriyi Bul
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı"));

        // 2. Sipariş (Fiş) Oluştur
        ResultingOrder order = new ResultingOrder();
        order.setCustomer(customer);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Tamamlandı");
        order.setTotalAmount(BigDecimal.ZERO); // Sonra hesaplayacağız
        
        // Siparişi veritabanına taslak olarak kaydet (ID oluşsun diye)
        order = orderRepository.save(order);

        BigDecimal toplamTutar = BigDecimal.ZERO;

        // 3. İlaçları Tek Tek Dön, Stoktan Düş ve Listeye Ekle
        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);

            Medicine medicine = medicineService.ilacBul(medId);

            // STOK KONTROLÜ
            if (medicine.getStockQuantity() < adet) {
                throw new RuntimeException("Yetersiz Stok! İlaç: " + medicine.getName());
            }

            // STOKTAN DÜŞ
            medicine.setStockQuantity(medicine.getStockQuantity() - adet);
            medicineService.ilacKaydet(medicine); // Güncel stoğu kaydet

            // SİPARİŞ DETAYINI KAYDET (Hangi ilaçtan kaç tane?)
            OrderMedicine orderDetail = new OrderMedicine();
            orderDetail.setOrder(order);
            orderDetail.setMedicine(medicine);
            orderDetail.setQuantity(adet);
            orderMedicineRepository.save(orderDetail);

            // Fiyat Hesapla (Fiyat * Adet)
            BigDecimal kalemTutar = medicine.getPrice().multiply(new BigDecimal(adet));
            toplamTutar = toplamTutar.add(kalemTutar);
        }

        // 4. Toplam Tutarı Siparişe İşle ve Güncelle
        order.setTotalAmount(toplamTutar);
        return orderRepository.save(order);
    }
}