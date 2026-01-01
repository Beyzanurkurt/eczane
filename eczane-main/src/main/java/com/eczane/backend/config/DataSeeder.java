package com.eczane.backend.config;

import com.eczane.backend.entity.*;
import com.eczane.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    // Gerekli tüm Repository'leri çağırıyoruz
    private final CategoryRepository categoryRepository;
    private final MedicineRepository medicineRepository;
    private final PharmacyBranchRepository branchRepository;
    private final CustomerRepository customerRepository;

    public DataSeeder(CategoryRepository categoryRepository, MedicineRepository medicineRepository, PharmacyBranchRepository branchRepository, CustomerRepository customerRepository) {
        this.categoryRepository = categoryRepository;
        this.medicineRepository = medicineRepository;
        this.branchRepository = branchRepository;
        this.customerRepository = customerRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Eğer veritabanı doluysa tekrar ekleme yapma
        if (categoryRepository.count() > 0) return;

        // 1. Kategori Ekle
        Category agriKesici = new Category();
        agriKesici.setCategoryName("Ağrı Kesici");
        agriKesici.setDescription("Genel ağrı kesiciler");
        categoryRepository.save(agriKesici);

        Category antibiyotik = new Category();
        antibiyotik.setCategoryName("Antibiyotik");
        antibiyotik.setDescription("Enfeksiyon ilaçları");
        categoryRepository.save(antibiyotik);

        // 2. İlaç Ekle
        Medicine parol = new Medicine(); // Inheritance olduğu için Medicine yerine OtcDrug da olabilir
        parol.setName("Parol 500mg");
        parol.setPrice(new BigDecimal("50.00"));
        parol.setStockQuantity(100);
        parol.setCategory(agriKesici);
        medicineRepository.save(parol);

        Medicine majezik = new Medicine();
        majezik.setName("Majezik");
        majezik.setPrice(new BigDecimal("120.50"));
        majezik.setStockQuantity(20); // Kritik stok testi için az verdik
        majezik.setCategory(agriKesici);
        medicineRepository.save(majezik);

        // 3. Şube Ekle
        PharmacyBranch sube = new PharmacyBranch();
        sube.setBranchName("Merkez Eczane");
        sube.setCity("İstanbul");
        sube.setAddress("Kadıköy Meydan");
        branchRepository.save(sube);

        // 4. Müşteri Ekle
        Customer musteri = new Customer();
        musteri.setName("Ahmet Yılmaz");
        musteri.setPhone("555-123-4567");
        musteri.setBirthDate(LocalDate.of(1990, 5, 20));
        customerRepository.save(musteri);

        System.out.println("✅ TEST VERİLERİ YÜKLENDİ!");
    }

}