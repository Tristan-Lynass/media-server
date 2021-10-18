package org.tristan.mediaserver.model;

import net.minidev.json.annotate.JsonIgnore;
import org.springframework.data.domain.Example;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.persistence.*;
import java.io.IOException;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static com.google.common.io.Files.getFileExtension;
import static java.time.OffsetDateTime.now;
import static java.util.Collections.emptySet;
import static java.util.Objects.requireNonNull;

@Entity
@Table(name = "media")
public class Media {

  @Id
  @GeneratedValue()
  private final UUID id;

  // TODO Setup Media (M) <---> (1) User relationship
  @ManyToOne(/*fetch = FetchType.EAGER*/)
  @JoinColumn(name = "user_id", nullable = false)
  private final User user;

  @Column(nullable = false)
  private final String extension;

  @Column(nullable = false)
  private final String originalFilename;

  @Column(nullable = false)
  private final OffsetDateTime uploadedAt;

  @Column
  private Integer width;

  @Column
  private Integer height;

  @Column(nullable = false)
  private final Long size;

  @Column
  private String md5;

  @Column(nullable = false)
  private Boolean favourite;

  @Column(nullable = false)
  private Boolean deleted;

  @Column(nullable = false)
  private Boolean processed;

  @ManyToMany()
  @JoinTable(name = "media_tag",
      joinColumns = { @JoinColumn(name = "media_id", referencedColumnName = "id") },
      inverseJoinColumns = { @JoinColumn(name = "tag_id", referencedColumnName = "id") })
  private final Set<Tag> tags;

  public static Example<Media> example(Optional<Set<Tag>> tags) {
    var media = new Media(null, null, null, null, null, null, null, null, null, null, true, tags.orElse(null));
    return Example.of(media);
  }

  public static Media from(User user, MultipartFile file) {
    var originalFilename = requireNonNull(file.getOriginalFilename(), "Filename cannot be blank");

    return new Media(
        user,
        getFileExtension(originalFilename),
        originalFilename,
        now(),
        null,
        null,
        file.getSize(),
        null,
        false,
        false,
        false,
        emptySet()
    );
  }

  protected Media() {
    // Default JPA constructor
    id = null;
    user = null;
    extension = null;
    originalFilename = null;
    uploadedAt = null;
    width = null;
    height = null;
    size = null;
    md5 = null;
    tags = null;
  }

  private Media(User user,
                String extension,
                String originalFilename,
                OffsetDateTime uploadedAt,
                Integer width,
                Integer height,
                Long size,
                String md5,
                Boolean favourite,
                Boolean deleted,
                Boolean processed,
                Set<Tag> tags) {
    this.id = null;
    this.user = user;
    this.extension = extension;
    this.originalFilename = originalFilename;
    this.uploadedAt = uploadedAt;
    this.width = width;
    this.height = height;
    this.size = size;
    this.md5 = md5;
    this.favourite = favourite;
    this.deleted = deleted;
    this.processed = processed;
    this.tags = tags;
  }

  public UUID getId() {
    return id;
  }

  @JsonIgnore
  public User getUser() {
    return user;
  }

  public String getExtension() {
    return extension;
  }

  public String getFilename() {
    return String.format("%s.%s", id, extension);
  }

  public String getOriginalFilename() {
    return originalFilename;
  }

  public String getThumbnailFilename() {
    return String.format("%s.jpg", id);
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

  public Long getSize() {
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

  public void setWidth(Integer width) {
    this.width = width;
  }

  public void setHeight(Integer height) {
    this.height = height;
  }

  public void setMd5(String md5) {
    this.md5 = md5;
  }
}
