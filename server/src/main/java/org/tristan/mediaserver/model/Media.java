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

  // TODO Setup Media (M) <---> (1) User relationship
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private final User user;

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

  @Column(nullable = false)
  private Boolean favourite;

  @Column(nullable = false)
  private Boolean deleted;

  @Column(nullable = false)
  private Boolean processed = false;

  @ManyToMany()
  @JoinTable(name = "media_tag")
  private final Set<Tag> tags;

  protected Media() {
    // Default JPA constructor
    id = null;
    user = null;
    extension = null;
    filename = null;
    uploadedAt = null;
    width = null;
    height = null;
    size = null;
    md5 = null;
    tags = null;
  }

  public Media(User user,
               String extension,
               String filename,
               OffsetDateTime uploadedAt,
               Integer width,
               Integer height,
               Integer size,
               String md5,
               Boolean favourite,
               Boolean deleted,
               Set<Tag> tags) {
    this.id = null;
    this.user = user;
    this.extension = extension;
    this.filename = filename;
    this.uploadedAt = uploadedAt;
    this.width = width;
    this.height = height;
    this.size = size;
    this.md5 = md5;
    this.favourite = favourite;
    this.deleted = deleted;
    this.tags = tags;
  }

  public UUID getId() {
    return id;
  }

  public User getUser() {
    return user;
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

  public Boolean isFavourite() {
    return favourite;
  }

  public void setFavourite(Boolean favourite) {
    this.favourite = favourite;
  }

  public Boolean isDeleted() {
    return deleted;
  }

  public void setDeleted(Boolean deleted) {
    this.deleted = deleted;
  }

  public Boolean isProcessed() {
    return processed;
  }

  public void setProcessed(Boolean processed) {
    this.processed = processed;
  }

  public Set<Tag> getTags() {
    return tags;
  }

}
