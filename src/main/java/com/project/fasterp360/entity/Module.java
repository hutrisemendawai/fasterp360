package com.project.fasterp360.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Table(name = "modules")
@Data
public class Module {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;         // e.g. "HR", "INVENTORY"

    @OneToMany(mappedBy = "module")
    private Set<Permission> permissions;
}
