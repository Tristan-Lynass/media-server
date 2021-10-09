package org.tristan.mediaserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    // authentication manager (see below)
    auth.
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
          .antMatchers("/api/login").permitAll()
          .anyRequest().authenticated()
          .and()
        .formLogin()
          .loginProcessingUrl("/api/login")
          .and()
        .logout()
          .logoutUrl("/api/logout").deleteCookies().invalidateHttpSession(true).clearAuthentication(true)
          .and()
        .csrf()
          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Override
  public UserDetailsService userDetailsService() {
    return new UserDetailsServiceImpl(credentialRepository);
  }

}
