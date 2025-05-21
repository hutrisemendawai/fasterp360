package com.project.fasterp360.module.hr.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    private String department;

    private String position;

    @Column(nullable = false)
    private LocalDate hireDate;

    private Double salary;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Employee manager;

    private String status; // e.g. "ACTIVE", "INACTIVE", "ON_LEAVE"
}
