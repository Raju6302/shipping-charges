package com.codewithvijay.fullstackbackend.repository;

import com.codewithvijay.fullstackbackend.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
    City findByName(String toCity);
}
