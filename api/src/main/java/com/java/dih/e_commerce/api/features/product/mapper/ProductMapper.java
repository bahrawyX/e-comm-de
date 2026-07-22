package com.java.dih.e_commerce.api.features.product.mapper;

import com.java.dih.e_commerce.api.features.product.dto.ProductDto;
import com.java.dih.e_commerce.api.features.product.model.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto toDto(Product product);

    List<ProductDto> toDtoList(List<Product> products);

}
