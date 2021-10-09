package org.tristan.mediaserver.repository;

import org.springframework.data.repository.Repository;
import org.tristan.mediaserver.model.User;

import java.util.Optional;
import java.util.UUID;

@org.springframework.stereotype.Repository
public interface UserRepository extends Repository<User, UUID> {

  Optional<User> findDistinctByUsername(String username);

}
