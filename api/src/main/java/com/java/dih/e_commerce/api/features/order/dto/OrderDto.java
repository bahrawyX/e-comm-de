package com.java.dih.e_commerce.api.features.order.dto;


import com.java.dih.e_commerce.api.features.order.model.OrderItem;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private LocalDateTime orderDate;
    private String status;
    private String email;
    private String address;
    private BigDecimal totalAmount;
    private List<OrderItem> orderItems;



}
