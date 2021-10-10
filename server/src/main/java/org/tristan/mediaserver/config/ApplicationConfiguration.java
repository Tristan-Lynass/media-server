package org.tristan.mediaserver.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.support.TransactionTemplate;
import org.tristan.mediaserver.model.User;
import org.tristan.mediaserver.repository.UserRepository;

@Configuration
public class ApplicationConfiguration implements ApplicationListener<ContextRefreshedEvent> {

  private final Logger log = LoggerFactory.getLogger(ApplicationConfiguration.class);

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {
    var context = event.getApplicationContext();
    var tx = context.getBean(TransactionTemplate.class);
    var userRepository = context.getBean(UserRepository.class);
    var encoder = context.getBean(PasswordEncoder.class);

    tx.execute(status -> {
      var username = "Admin";
      if (userRepository.findDistinctByUsername(username).isEmpty()) {
        log.info("Creating default user");
        var defaultUser = new User(username, encoder.encode("admin"), true);
        userRepository.save(defaultUser);
      }
      return username;
    });
  }

}
