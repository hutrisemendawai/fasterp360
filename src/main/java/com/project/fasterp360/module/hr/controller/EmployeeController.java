package com.project.fasterp360.module.hr.controller;

import com.project.fasterp360.module.hr.entity.Employee;
import com.project.fasterp360.module.hr.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hr/employees")
public class EmployeeController {
    private final EmployeeService svc;

    public EmployeeController(EmployeeService svc) { this.svc = svc; }

    @GetMapping
    public List<Employee> all() { return svc.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> get(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(svc.findById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody Employee e) {
        return ResponseEntity.ok(svc.create(e));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(
        @PathVariable Long id,
        @RequestBody Employee updated
    ) {
        try {
            return ResponseEntity.ok(svc.update(id, updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}
