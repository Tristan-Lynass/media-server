package org.tristan.mediaserver.repository;

import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.tristan.mediaserver.model.User;

import java.util.Optional;
import java.util.UUID;

@RepositoryRestResource(path = "user")
public interface UserRepository extends Repository<User, UUID> {

  @RestResource(exported = false)
  Optional<User> findDistinctByUsername(String username);

  User save(User entity);

}
