package org.tristan.mediaserver.controller;

import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.tristan.mediaserver.model.User;
import org.tristan.mediaserver.repository.UserRepository;

import javax.transaction.Transactional;

@RepositoryRestController
@Transactional
@RequestMapping("/user")
public class UserController {

  private final UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping()
  public ResponseEntity<User> get(Authentication authentication) {
    return ResponseEntity.of(userRepository.findDistinctByUsername(authentication.getName()));
  }
}
