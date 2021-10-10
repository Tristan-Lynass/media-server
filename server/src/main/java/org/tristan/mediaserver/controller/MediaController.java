package org.tristan.mediaserver.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.tristan.mediaserver.model.Media;
import org.tristan.mediaserver.model.Tag;
import org.tristan.mediaserver.repository.MediaRepository;
import org.tristan.mediaserver.repository.UserRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;
import java.util.Set;

@RestController
@Transactional
@RequestMapping("/media")
public class MediaController {

  private final Logger log = LoggerFactory.getLogger(MediaController.class);

  private final MediaRepository mediaRepository;

  private final UserRepository userRepository;

  private final EntityManager entityManager;

  public MediaController(MediaRepository mediaRepository, UserRepository userRepository, EntityManager entityManager) {
    this.mediaRepository = mediaRepository;
    this.userRepository = userRepository;
    this.entityManager = entityManager;
  }

  @GetMapping("/search")
  public Page<Media> search(Pageable pageable, Authentication authentication, @PathVariable Optional<Set<Tag>> tags) {
    var user = userRepository.findDistinctByUsername(authentication.getName())
        .orElseThrow(() -> new IllegalStateException("Unable to find current user"));
    var media = new Media(user, null, null, null, null, null, null, null, null, null, tags.orElse(null));
    var example = Example.of(media);

    return this.mediaRepository.findAll(example, pageable);
  }

  @PostMapping("/upload")
  public void upload(@RequestParam("file") MultipartFile file) throws IOException {
    log.debug("hm");

//        var user = userRepository.findDistinctByUsername(authentication.getName())
//            .orElseThrow(() -> new IllegalStateException("Unable to find current user"));

//        var media = new Media(
//            user,
//            file.get
//            file.getSize()
//        );
//
//        file.transferTo(new File("media/"));
  }
}
