package com.project.fasterp360.controller;

import com.project.fasterp360.entity.User;
import com.project.fasterp360.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {
  private final UserRepository userRepo;

  public AdminUserController(UserRepository userRepo) {
    this.userRepo = userRepo;
  }

  @GetMapping
  public List<User> all() { return userRepo.findAll(); }

  @GetMapping("/{id}")
  public ResponseEntity<User> get(@PathVariable Long id) {
    return userRepo.findById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User body) {
    return userRepo.findById(id).map(u -> {
      u.setRole(body.getRole());
      u.setEmployee(body.getEmployee());
      // you may allow password change too, but re-encode if changed
      userRepo.save(u);
      return ResponseEntity.ok(u);
    }).orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    if (!userRepo.existsById(id)) return ResponseEntity.notFound().build();
    userRepo.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
