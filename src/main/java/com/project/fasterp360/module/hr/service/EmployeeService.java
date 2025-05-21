package com.project.fasterp360.module.hr.service;

import com.project.fasterp360.module.hr.entity.Employee;
import com.project.fasterp360.module.hr.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<Employee> findAll() {
        return repo.findAll();
    }
    public Employee findById(Long id) {
        return repo.findById(id).orElseThrow(() -> 
            new IllegalArgumentException("Employee not found: " + id));
    }
    public Employee create(Employee e) {
        return repo.save(e);
    }
    public Employee update(Long id, Employee updated) {
        return repo.findById(id).map(e -> {
            e.setFirstName(updated.getFirstName());
            e.setMiddleName(updated.getMiddleName());
            e.setLastName(updated.getLastName());
            e.setEmail(updated.getEmail());
            e.setPhone(updated.getPhone());
            e.setDepartment(updated.getDepartment());
            e.setPosition(updated.getPosition());
            e.setHireDate(updated.getHireDate());
            e.setSalary(updated.getSalary());
            e.setManager(updated.getManager());
            e.setStatus(updated.getStatus());
            return repo.save(e);
        }).orElseThrow(() -> new IllegalArgumentException("Employee not found: " + id));
    }
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
