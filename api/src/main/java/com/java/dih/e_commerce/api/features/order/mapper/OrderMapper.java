package com.java.dih.e_commerce.api.features.order.mapper;

import com.java.dih.e_commerce.api.features.order.dto.OrderDto;
import com.java.dih.e_commerce.api.features.order.model.Order;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    OrderDto toDto(Order order);

    List<OrderDto> toDtoList(List<Order> orders);

    Order toEntity(OrderDto orderDto);

}
