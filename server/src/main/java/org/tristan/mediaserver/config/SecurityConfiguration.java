package org.tristan.mediaserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.tristan.mediaserver.repository.UserRepository;
import org.tristan.mediaserver.service.UserDetailsServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
@EnableWebSecurity
class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final UserRepository userRepository;

  public SecurityConfiguration(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
          .antMatchers("/api/login", "/api/xsrf").permitAll()
          .anyRequest().authenticated()
          .and()
        .formLogin()
          .loginProcessingUrl("/api/login")
          .usernameParameter("username")
          .passwordParameter("password")
          .successHandler(successHandler())
          .failureHandler(failureHandler())
          .and()
        .logout()
          .logoutUrl("/api/logout").deleteCookies().invalidateHttpSession(true).clearAuthentication(true)
          .and()
        .csrf()
          .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
  }

  private AuthenticationSuccessHandler successHandler() {
    return (httpServletRequest, httpServletResponse, authentication) -> {
      httpServletResponse.getWriter().append("{\"status\":\"OK\"}");
      httpServletResponse.setStatus(200);
    };
  }

  private AuthenticationFailureHandler failureHandler() {
    return (httpServletRequest, httpServletResponse, e) -> {
      httpServletResponse.getWriter().append("Authentication failure");
      httpServletResponse.setStatus(401);
    };
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  @Override
  public UserDetailsService userDetailsService() {
    return new UserDetailsServiceImpl(userRepository);
  }

}
