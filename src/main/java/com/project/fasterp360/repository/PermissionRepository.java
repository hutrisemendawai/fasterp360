// PermissionRepository.java
package com.project.fasterp360.repository;

import com.project.fasterp360.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission,Long> { }
