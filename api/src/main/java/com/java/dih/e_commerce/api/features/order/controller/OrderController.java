package com.java.dih.e_commerce.api.features.order.controller;

import com.java.dih.e_commerce.api.features.order.dto.OrderDto;
import com.java.dih.e_commerce.api.features.order.service.OrderService;
import io.swagger.models.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id){
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto){
        OrderDto createdOrder = orderService.createOrder(orderDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(
            @PathVariable Long id,
            @RequestBody OrderDto orderDto
    ){

        try{
            OrderDto updatedOrder = orderService.updateOrder(id,orderDto);
            return ResponseEntity.ok(orderService.updateOrder(id, orderDto));
        }catch(IllegalStateException exception){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(exception.getMessage());
        }

    }


    @DeleteMapping("/{id}")
    public  ResponseEntity<?> deleteOrder(@PathVariable Long id){
        try{
            orderService.deleteOrder(id);
            return ResponseEntity.noContent().build();
        }catch(IllegalStateException exception){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body((exception.getMessage()));
        }
    }

}