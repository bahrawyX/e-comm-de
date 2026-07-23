package com.java.dih.e_commerce.api.features.rating.repository;

import com.java.dih.e_commerce.api.features.rating.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query("select coalesce(avg(r.stars), 0) from Rating r where r.productId = ?1")
    double averageForProduct(Long productId);

    long countByProductId(Long productId);
}
