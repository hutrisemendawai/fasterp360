package com.project.fasterp360.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Table(name = "roles")
@Data
public class Role {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;        // e.g. "ROLE_ADMIN", "ROLE_USER"

    private String description;

    @OneToMany(mappedBy = "role")
    private Set<Permission> permissions;
}
