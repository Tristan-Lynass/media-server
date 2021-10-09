package org.tristan.mediaserver.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.tristan.mediaserver.repository.UserRepository;

import javax.transaction.Transactional;

import static java.util.Collections.emptyList;

public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var user = userRepository.findDistinctByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Unable to find user: " + username));

    return new User(username, user.getPassword(), emptyList());
  }
}
