package com.java.dih.e_commerce.api.features.product.repository;

import com.java.dih.e_commerce.api.features.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
