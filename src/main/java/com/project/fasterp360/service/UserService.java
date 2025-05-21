package com.project.fasterp360.service;

import com.project.fasterp360.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service; 

@Service
public class UserService implements UserDetailsService {
  private final UserRepository userRepository;
  public UserService(UserRepository repo) { this.userRepository = repo; }
  @Override
  public UserDetails loadUserByUsername(String u) {
    return userRepository.findByUsername(u)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }
}
