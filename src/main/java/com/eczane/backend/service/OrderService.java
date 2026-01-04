package com.eczane.backend.service;

import com.eczane.backend.entity.*;
// Bunu da ekle
import com.eczane.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.eczane.backend.entity.PharmacyBranch; // Paket ismin farklı olabilir, kendi Branch sınıfını seç

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
    private final PharmacyBranchRepository pharmacyBranchRepository;
    // --- CONSTRUCTOR (YAPICI METOT) ---
    // Hatayı burası çözecek. incomingOrderRepository'yi buraya parametre olarak ekliyoruz.
    
    public OrderService(OrderRepository orderRepository, 
                        MedicineService medicineService, 
                        OrderMedicineRepository orderMedicineRepository, 
                        CustomerRepository customerRepository,
                        IncomingOrderRepository incomingOrderRepository,
                        PharmacyBranchRepository pharmacyBranchRepository) { // <-- EKLENDİ
        this.orderRepository = orderRepository;
        this.medicineService = medicineService;
        this.orderMedicineRepository = orderMedicineRepository;
        this.customerRepository = customerRepository;
        this.incomingOrderRepository = incomingOrderRepository; // <-- EKLENDİ (Artık initialize edildi)
        this.pharmacyBranchRepository = pharmacyBranchRepository;
    }

    // --- MÜŞTERİYE SATIŞ FONKSİYONU ---
    // --- MÜŞTERİYE SATIŞ FONKSİYONU (YENİ: Önce Hesapla, Sonra Kaydet) ---
    @Transactional
    public ResultingOrder satisYap(Long customerId, List<Long> medicineIds, List<Integer> quantities) {
        
        // 1. Müşteri Kontrolü
        List<Customer> musteriler = customerRepository.findAll();
        if (musteriler.isEmpty()) throw new RuntimeException("Müşteri bulunamadı!");
        Customer customer = musteriler.get(0);

        // 2. ÖN HESAPLAMA: Toplam Tutarı ve Stok Durumunu Baştan Hesapla
        BigDecimal toplamTutar = BigDecimal.ZERO;
        
        // İlaçları kontrol et ve fiyatı topla
        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);
            Medicine medicine = medicineService.ilacBul(medId);

            // Stok Kontrolü
            if (medicine.getStockQuantity() < adet) {
                throw new RuntimeException("Yetersiz Stok: " + medicine.getName());
            }

            // Fiyatı Topla
            BigDecimal kalemTutar = medicine.getPrice().multiply(new BigDecimal(adet));
            toplamTutar = toplamTutar.add(kalemTutar);
        }

        // 3. SİPARİŞİ OLUŞTUR (Doğru Fiyatla!)
        ResultingOrder order = new ResultingOrder();
        order.setCustomerId(customerId);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Tamamlandı");
        order.setTotalAmount(toplamTutar); // <-- ARTIK EN BAŞTA SET EDİYORUZ!
        
        // Veritabanına Kaydet (Artık UPDATE yapmaya gerek yok, direkt doğru giriyor)
        order = orderRepository.saveAndFlush(order);

        // 4. DETAYLARI KAYDET (Stok Düşümü İçin)
        for (int i = 0; i < medicineIds.size(); i++) {
            Long medId = medicineIds.get(i);
            Integer adet = quantities.get(i);
            Medicine medicine = medicineService.ilacBul(medId); // Tekrar çekmek sorun değil, cache'den gelir

            OrderMedicine orderDetail = new OrderMedicine();
            orderDetail.setOrder(order);
            orderDetail.setMedicine(medicine);
            orderDetail.setQuantity(adet);
            
            orderMedicineRepository.save(orderDetail);
        }

        System.out.println("✅ Satış Kaydedildi. ID: " + order.getOrderId() + " | Tutar: " + toplamTutar);
        return order;
    
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
        PharmacyBranch defaultBranch = pharmacyBranchRepository.findById(2L).orElse(null); 
        order.setPharmacyBranch(defaultBranch); 
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