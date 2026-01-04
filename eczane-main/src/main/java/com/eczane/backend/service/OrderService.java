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
    // YENİ EKLENEN REPO:
    private final IncomingOrderRepository incomingOrderRepository;

    // --- CONSTRUCTOR (YAPICI METOT) ---
    // Hatayı burası çözecek. incomingOrderRepository'yi buraya parametre olarak ekliyoruz.
    public OrderService(OrderRepository orderRepository, 
                        MedicineService medicineService, 
                        OrderMedicineRepository orderMedicineRepository, 
                        CustomerRepository customerRepository,
                        IncomingOrderRepository incomingOrderRepository) { // <-- EKLENDİ
        this.orderRepository = orderRepository;
        this.medicineService = medicineService;
        this.orderMedicineRepository = orderMedicineRepository;
        this.customerRepository = customerRepository;
        this.incomingOrderRepository = incomingOrderRepository; // <-- EKLENDİ (Artık initialize edildi)
    }

    // --- MÜŞTERİYE SATIŞ FONKSİYONU ---
    @Transactional
    public ResultingOrder satisYap(Long customerId, List<Long> medicineIds, List<Integer> quantities) {
        // Müşteri bulma (Garanti yöntem)
        List<Customer> musteriler = customerRepository.findAll();
        if (musteriler.isEmpty()) {
            throw new RuntimeException("Sistemde kayıtlı müşteri yok!");
        }
        Customer customer = musteriler.get(0);

        ResultingOrder order = new ResultingOrder();
        order.setCustomer(customer);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Tamamlandı");
        order.setTotalAmount(BigDecimal.ZERO);
        
        order = orderRepository.save(order);

        BigDecimal toplamTutar = BigDecimal.ZERO;

        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);
            Medicine medicine = medicineService.ilacBul(medId);

            if (medicine.getStockQuantity() < adet) {
                throw new RuntimeException("Yetersiz Stok! İlaç: " + medicine.getName());
            }

            OrderMedicine orderDetail = new OrderMedicine();
            orderDetail.setOrder(order);
            orderDetail.setMedicine(medicine);
            orderDetail.setQuantity(adet);
            
            orderMedicineRepository.save(orderDetail);

            BigDecimal kalemTutar = medicine.getPrice().multiply(new BigDecimal(adet));
            toplamTutar = toplamTutar.add(kalemTutar);
        }

        order.setTotalAmount(toplamTutar);
        return orderRepository.save(order);
    }

    // --- TEDARİKÇİDEN MAL ALIM FONKSİYONU (YENİ) ---
    @Transactional
    public IncomingOrder stokEkle(Long supplierId, List<Long> medicineIds, List<Integer> quantities, String irsaliyeNo) {
        
        // 1. Sipariş Ana Kaydı
        IncomingOrder order = new IncomingOrder();
        order.setOrderDate(LocalDate.now());
        order.setStatus("Tedarik Edildi"); // Order sınıfından geliyor (@Data sayesinde çalışır)
        order.setTotalAmount(BigDecimal.ZERO); 
        order.setSupplierId(supplierId);   // IncomingOrder sınıfından geliyor
        order.setSupplierOrderCode(irsaliyeNo);

        order = incomingOrderRepository.save(order);

        // 2. İlaçları Ekle
        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);

            Medicine medicine = medicineService.ilacBul(medId);

            OrderMedicine orderDetail = new OrderMedicine();
            orderDetail.setOrder(order);
            orderDetail.setMedicine(medicine);
            orderDetail.setQuantity(adet);
            
            // Trigger burada devreye girip stoğu arttıracak
            orderMedicineRepository.save(orderDetail);
        }

        return order;
    }
}