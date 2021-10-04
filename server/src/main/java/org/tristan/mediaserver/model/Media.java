package org.tristan.mediaserver.model;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "media")
public class Media {

  @Id
  @GeneratedValue()
  private final UUID id;

  @Column(nullable = false)
  private final String extension;

  @Column(nullable = false)
  private final String filename;

  @Column(nullable = false)
  private final OffsetDateTime uploadedAt;

  @Column
  private final Integer width;

  @Column
  private final Integer height;

  @Column(nullable = false)
  private final Integer size;

  @Column(nullable = false)
  private final String md5;

  @ManyToMany()
  @JoinTable(name = "media_tag")
  private final Set<Tag> tags;

  protected Media() {
    // Default JPA constructor
    this.id = null;
    this.extension = null;
    this.filename = null;
    this.uploadedAt = null;
    this.width = null;
    this.height = null;
    this.size = null;
    this.md5 = null;
    this.tags = null;
  }

  public Media(String extension, String filename, OffsetDateTime uploadedAt, Integer width, Integer height, Integer size, String md5, Set<Tag> tags) {
    this.id = null;
    this.extension = extension;
    this.filename = filename;
    this.uploadedAt = uploadedAt;
    this.width = width;
    this.height = height;
    this.size = size;
    this.md5 = md5;
    this.tags = tags;
  }

  public UUID getId() {
    return id;
  }

  public String getExtension() {
    return extension;
  }

  public String getFilename() {
    return filename;
  }

  public OffsetDateTime getUploadedAt() {
    return uploadedAt;
  }

  public Integer getWidth() {
    return width;
  }

  public Integer getHeight() {
    return height;
  }

  public Integer getSize() {
    return size;
  }

  public String getMd5() {
    return md5;
  }

  public Set<Tag> getTags() {
    return tags;
  }
}
