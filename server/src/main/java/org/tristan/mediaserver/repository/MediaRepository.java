package org.tristan.mediaserver.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.tristan.mediaserver.model.Media;
import org.tristan.mediaserver.model.Tag;
import org.tristan.mediaserver.model.User;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RepositoryRestResource(path = "media")
public interface MediaRepository extends JpaRepository<Media, UUID> {

  Page<Media> findAllByUserUsernameAndTagsIn(String username, Set<Tag> tags, /*Example<Media> example, */Pageable pageable);

  Page<Media> findAllByUserUsername(String username, /*Example<Media> example, */Pageable pageable);

  List<Media> findByProcessedFalseOrderByUploadedAtDesc();

  List<Media> findByIdAndUser(UUID id, User user);
}
