package com.java.dih.e_commerce.api.features.product.service;

import com.java.dih.e_commerce.api.features.product.dto.ProductDto;
import com.java.dih.e_commerce.api.features.product.mapper.ProductMapper;
import com.java.dih.e_commerce.api.features.product.repository.ProductRepository;
import com.java.dih.e_commerce.api.features.rating.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final RatingRepository ratingRepository;

    public ProductService(ProductRepository productRepository,
                          ProductMapper productMapper,
                          RatingRepository ratingRepository) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.ratingRepository = ratingRepository;
    }

    public List<ProductDto> getAllProducts() {
        List<ProductDto> products = productMapper.toDtoList(productRepository.findAll());
        for (ProductDto product : products) {
            product.setAverageRating(ratingRepository.averageForProduct(product.getId()));
            product.setRatingCount((int) ratingRepository.countByProductId(product.getId()));
        }
        return products;
    }
}
