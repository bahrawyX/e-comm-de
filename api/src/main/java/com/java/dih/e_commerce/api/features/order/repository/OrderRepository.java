package com.java.dih.e_commerce.api.features.order.repository;

import com.java.dih.e_commerce.api.features.order.model.Order;
import com.java.dih.e_commerce.api.features.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
