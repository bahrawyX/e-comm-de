package com.java.dih.e_commerce.api.features.order.service;

import com.java.dih.e_commerce.api.features.order.dto.OrderDto;
import com.java.dih.e_commerce.api.features.order.mapper.OrderMapper;
import com.java.dih.e_commerce.api.features.order.model.Order;
import com.java.dih.e_commerce.api.features.order.model.OrderItem;
import com.java.dih.e_commerce.api.features.order.repository.OrderRepository;
import com.java.dih.e_commerce.api.features.product.model.Product;
import com.java.dih.e_commerce.api.features.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private static final long EDIT_DELETE_LIMIT_MINUTES = 5;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderMapper orderMapper,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.productRepository = productRepository;
    }

    public List<OrderDto> getAllOrders() {
        return orderMapper.toDtoList(orderRepository.findAll());
    }

    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));

        return orderMapper.toDto(order);
    }

//    public OrderDto createOrder(OrderDto orderDto) {
//        Order order = orderMapper.toEntity(orderDto);
//        order.setOrderDate(LocalDateTime.now());
//        Order savedOrder = orderRepository.save(order);
//        return orderMapper.toDto(savedOrder);
//    }

    public OrderDto createOrder(OrderDto orderDto) {

        Order order = new Order();

        order.setOrderDate(LocalDateTime.now());
        order.setStatus(orderDto.getStatus());
        order.setAddress(orderDto.getAddress());
        order.setEmail(orderDto.getEmail());

        double totalAmount = 0;
        if (orderDto.getOrderItems() != null) {
            for (OrderItem orderItemFromRequest :
                    orderDto.getOrderItems()) {
                Long productId = orderItemFromRequest
                        .getProduct()
                        .getId();

                Product product = productRepository.findById(productId)
                        .orElseThrow(() ->
                                new RuntimeException("Product not found"));

                OrderItem orderItem = new OrderItem();

                orderItem.setQuantity(
                        orderItemFromRequest.getQuantity()
                );

                orderItem.setProduct(product);
                orderItem.setOrder(order);
                order.getOrderItems().add(orderItem);

                double itemTotal = product.getPrice()* orderItem.getQuantity();
                totalAmount += itemTotal;

            }
            order.setTotalAmount(totalAmount);
        }

        Order savedOrder = orderRepository.save(order);
        return orderMapper.toDto(savedOrder);
    }


    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        checkModificationTimeLimit(order);
        orderRepository.delete(order);

    }

    private void checkModificationTimeLimit(Order order) {
        LocalDateTime deadline = order.getOrderDate().plusMinutes(EDIT_DELETE_LIMIT_MINUTES);
        if (LocalDateTime.now().isAfter(deadline)) {
            throw new IllegalStateException("Order can no longer be edited or deleted");
        }
    }


    public OrderDto updateOrder(Long id, OrderDto orderDto) {
        Order existingOrder = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        checkModificationTimeLimit(existingOrder);
        existingOrder.setAddress(orderDto.getAddress());
        existingOrder.getOrderItems().clear();
        double totalAmount = 0;

        if (orderDto.getOrderItems() != null) {
            for (OrderItem orderItemFromRequest : orderDto.getOrderItems()) {
                Long productId = orderItemFromRequest.getProduct().getId();
                Product product = productRepository.findById(productId).orElseThrow(()->new RuntimeException("Product not found"));
                OrderItem newOrderItem = new OrderItem();
                newOrderItem.setQuantity(orderItemFromRequest.getQuantity());
                newOrderItem.setProduct(product);
                newOrderItem.setOrder(existingOrder);
                existingOrder.getOrderItems().add(newOrderItem);

                double itemTotal = product.getPrice() * newOrderItem.getQuantity();
                totalAmount+=itemTotal;
            }
            existingOrder.setTotalAmount(totalAmount);
        }
        Order updatedOrder = orderRepository.save(existingOrder);
        return  orderMapper.toDto(updatedOrder);
    }


}