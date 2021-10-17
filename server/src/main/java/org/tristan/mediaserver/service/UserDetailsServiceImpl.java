package org.tristan.mediaserver.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.tristan.mediaserver.repository.UserRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

public class UserDetailsServiceImpl implements UserDetailsService {

  private static final GrantedAuthority USER_AUTHORITY = new SimpleGrantedAuthority("USER_ROLE");
  private static final GrantedAuthority ADMIN_AUTHORITY = new SimpleGrantedAuthority("ADMIN_ROLE");

  private final UserRepository userRepository;

  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var user = userRepository.findDistinctByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Unable to find user: " + username));

    var authorities = new ArrayList<>(List.of(USER_AUTHORITY));

    if (user.isAdmin()) {
      authorities.add(ADMIN_AUTHORITY);
    }

    return new User(username, user.getPassword(), authorities);
  }
}
