package org.tristan.mediaserver.model;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.regex.Pattern;

class PasswordEncoderListener {
  private static final Pattern BCRYPT_PATTERN = Pattern.compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");

  private final PasswordEncoder encoder;


  public PasswordEncoderListener(@Lazy PasswordEncoder encoder) {
    this.encoder = encoder;
  }

  @PrePersist
  @PreUpdate
  public void beforeSave(User user) {
    String password = user.getPassword();
    // TODO: See if we can check by id=null instead
    if (!BCRYPT_PATTERN.matcher(password).matches()) {
      String encoded = encoder.encode(password);
      user.setPassword(encoded);
    }
  }
}
