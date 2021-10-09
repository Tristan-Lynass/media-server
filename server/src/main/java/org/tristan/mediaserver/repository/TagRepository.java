package org.tristan.mediaserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.tristan.mediaserver.model.Tag;

import java.util.UUID;

@RepositoryRestResource(path = "tag")
public interface TagRepository extends JpaRepository<Tag, UUID> {
}
