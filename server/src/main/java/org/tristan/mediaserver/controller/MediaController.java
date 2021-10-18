package org.tristan.mediaserver.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.tristan.mediaserver.model.Media;
import org.tristan.mediaserver.model.Tag;
import org.tristan.mediaserver.repository.MediaRepository;
import org.tristan.mediaserver.repository.UserRepository;
import org.tristan.mediaserver.service.FileStorageService;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import static java.util.Objects.requireNonNull;

@RepositoryRestController
@RequestMapping("/media")
public class MediaController {

  private final Logger log = LoggerFactory.getLogger(MediaController.class);

  private final MediaRepository mediaRepository;

  private final UserRepository userRepository;

  private final EntityManager entityManager;

  private final FileStorageService fileStoreService;

  private final TransactionTemplate tx;

  public MediaController(MediaRepository mediaRepository,
                         UserRepository userRepository,
                         EntityManager entityManager,
                         FileStorageService fileStoreService,
                         TransactionTemplate tx) {
    this.mediaRepository = mediaRepository;
    this.userRepository = userRepository;
    this.entityManager = entityManager;
    this.fileStoreService = fileStoreService;
    this.tx = tx;
  }

//  @Transactional
//  @PutMapping("tag")
//  public void addTag(Authentication authentication, @RequestParam List<Media> media) {
//    var user = userRepository.findDistinctByUsername(authentication.getName())
//        .orElseThrow(() -> new IllegalStateException("Unable to find current user"));
//
//    // media.stream().map(UUID::fromString).collect(toList())
//    this.mediaRepository.findAllById(media).stream()
//        .filter(m -> m.getUser().getId().equals(user.getId()))
//        .forEach(m -> {
//          m.getTags().add(tag);
//          mediaRepository.save(m);
//        });
//  }

  @Transactional
  @DeleteMapping("tag")
  public void deleteTag(Authentication authentication, @PathVariable List<UUID> media, @PathVariable Tag tag) {
    var user = userRepository.findDistinctByUsername(authentication.getName())
        .orElseThrow(() -> new IllegalStateException("Unable to find current user"));

    this.mediaRepository.findAllById(media).stream()
        .filter(m -> m.getUser().getId().equals(user.getId()))
        .forEach(m -> {
          m.getTags().remove(tag);
          mediaRepository.save(m);
        });
  }

  @Transactional
  @GetMapping("/search")
  public @ResponseBody
  Page<Media> search(Pageable pageable, Authentication authentication, @ModelAttribute("myValuesInRows") List<Tag> tags) {
    if (tags == null) {
      return this.mediaRepository.findAllByUserUsername(authentication.getName(), pageable);
    }
    return this.mediaRepository.findAllByUserUsernameAndTagsIn(authentication.getName(), new HashSet<>(tags), pageable);
  }

  @PostMapping("/upload")
  public void upload(Authentication authentication, @RequestParam("file") MultipartFile file) throws Exception {

    var media = tx.execute(s -> {
      var user = userRepository.findDistinctByUsername(authentication.getName())
          .orElseThrow(() -> new IllegalStateException("Unable to find current user"));
      return this.mediaRepository.save(Media.from(user, file));
    });

    requireNonNull(media, file.getOriginalFilename() + " Could not be read!!!!!");

    this.fileStoreService.save(file, media.getFilename());
  }

}
