package com.project.fasterp360;

import com.project.fasterp360.entity.User;
import com.project.fasterp360.entity.Role;
import com.project.fasterp360.module.hr.entity.Employee;
import com.project.fasterp360.module.hr.repository.EmployeeRepository;
import com.project.fasterp360.repository.RoleRepository;
import com.project.fasterp360.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@SpringBootApplication
public class Fasterp360Application implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(Fasterp360Application.class, args);
    }

    @Override
    public void run(String... args) {
        // 1) ensure ROLE_USER exists
        Role userRole = roleRepository.findByName("ROLE_USER")
            .orElseGet(() -> {
                Role r = new Role();
                r.setName("ROLE_USER");
                r.setDescription("Standard user");
                return roleRepository.save(r);
            });

        // 2) ensure ROLE_ADMIN exists
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
            .orElseGet(() -> {
                Role r = new Role();
                r.setName("ROLE_ADMIN");
                r.setDescription("Administrator");
                return roleRepository.save(r);
            });

        // 3) ensure a default "admin" Employee exists
        Employee adminEmp = employeeRepository.findByEmail("admin@erp.com")
            .orElseGet(() -> {
                Employee e = new Employee();
                e.setFirstName("System");
                e.setLastName("Admin");
                e.setEmail("admin@erp.com");
                e.setHireDate(LocalDate.now());        // required
                e.setStatus("ACTIVE");                 // good practice
                e.setDepartment("Administration");     // optional
                e.setPosition("Administrator");        // optional
                return employeeRepository.save(e);
            });

        // 4) create an "admin" user if none exists
        userRepository.findByUsername("admin")
            .orElseGet(() -> {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(adminRole);
                admin.setEmployee(adminEmp);
                return userRepository.save(admin);
            });
    }
}
