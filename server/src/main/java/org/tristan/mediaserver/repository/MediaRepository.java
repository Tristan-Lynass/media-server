package org.tristan.mediaserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.tristan.mediaserver.model.Media;

import java.util.UUID;

@RepositoryRestResource(path = "media")
public interface MediaRepository extends JpaRepository<Media, UUID> {
}
