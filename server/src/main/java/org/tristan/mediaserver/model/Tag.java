package org.tristan.mediaserver.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tag")
public class Tag {

  @Id
  @GeneratedValue()
  private final UUID id;

  @Column
  private final String name;

  @ManyToMany(mappedBy = "tags")
  private final Set<Media> media = new HashSet<>();

  protected Tag() {
    // Default JPA constructor
    this.id = null;
    this.name = null;
  }

  public Tag(UUID id, String name) {
    this.id = id;
    this.name = name;
  }
}
