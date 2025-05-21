package com.project.fasterp360.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "permissions")
@Data
public class Permission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne @JoinColumn(name = "module_id", nullable = false)
    private Module module;

    @Column(nullable = false)
    private String accessType;   // e.g. "READ", "WRITE", "DELETE", "APPROVE"
}
