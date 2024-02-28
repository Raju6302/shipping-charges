package com.codewithvijay.fullstackbackend.repository;

import com.codewithvijay.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
