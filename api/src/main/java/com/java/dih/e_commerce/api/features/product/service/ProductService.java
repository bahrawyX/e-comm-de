package com.java.dih.e_commerce.api.features.product.service;

import com.java.dih.e_commerce.api.features.product.dto.ProductDto;
import com.java.dih.e_commerce.api.features.product.mapper.ProductMapper;
import com.java.dih.e_commerce.api.features.product.model.Product;
import com.java.dih.e_commerce.api.features.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public List<ProductDto> getAllProducts() {
        return productMapper.toDtoList(productRepository.findAll());
    }


}
