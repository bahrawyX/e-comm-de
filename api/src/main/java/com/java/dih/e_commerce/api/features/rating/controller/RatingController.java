package com.java.dih.e_commerce.api.features.rating.controller;

import com.java.dih.e_commerce.api.features.rating.model.Rating;
import com.java.dih.e_commerce.api.features.rating.repository.RatingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingRepository ratingRepository;

    public RatingController(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @PostMapping
    public Rating rate(@RequestBody Rating rating) {
        return ratingRepository.save(rating);
    }

    @GetMapping("/{productId}")
    public Map<String, Object> getForProduct(@PathVariable Long productId) {
        return Map.of(
                "productId", productId,
                "average", ratingRepository.averageForProduct(productId),
                "count", ratingRepository.countByProductId(productId)
        );
    }
}
