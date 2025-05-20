package com.project.fasterp360.module.inventory.repository;

import com.project.fasterp360.module.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}