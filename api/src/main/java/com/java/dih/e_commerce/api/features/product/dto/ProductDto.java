package com.java.dih.e_commerce.api.features.product.dto;


import lombok.*;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String category;
    private Double price;
    private Integer quantity;
    private Double averageRating;
    private Integer ratingCount;
}
