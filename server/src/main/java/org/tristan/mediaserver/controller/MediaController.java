package org.tristan.mediaserver.controller;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import net.coobird.thumbnailator.resizers.Resizer;
import org.imgscalr.Scalr;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.tristan.mediaserver.model.Media;
import org.tristan.mediaserver.model.Tag;
import org.tristan.mediaserver.repository.MediaRepository;
import org.tristan.mediaserver.repository.UserRepository;
import org.tristan.mediaserver.service.FileStorageService;

import javax.imageio.ImageIO;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Optional;
import java.util.Set;

import static java.awt.Color.WHITE;
import static java.awt.image.BufferedImage.TYPE_INT_RGB;

@RepositoryRestController
@Transactional
@RequestMapping("/media")
public class MediaController {

  private final Logger log = LoggerFactory.getLogger(MediaController.class);

  private final MediaRepository mediaRepository;

  private final UserRepository userRepository;

  private final EntityManager entityManager;

  private final FileStorageService fileStoreService;

  public MediaController(MediaRepository mediaRepository,
                         UserRepository userRepository,
                         EntityManager entityManager,
                         FileStorageService fileStoreService
  ) {
    this.mediaRepository = mediaRepository;
    this.userRepository = userRepository;
    this.entityManager = entityManager;
    this.fileStoreService = fileStoreService;
  }

  @GetMapping("/search")
  public Page<Media> search(Pageable pageable, Authentication authentication, @PathVariable Optional<Set<Tag>> tags) {
    var user = userRepository.findDistinctByUsername(authentication.getName())
        .orElseThrow(() -> new IllegalStateException("Unable to find current user"));


    return this.mediaRepository.findAll(Media.example(user, tags), pageable);
  }

  @PostMapping("/upload")
  public void upload(Authentication authentication, @RequestParam("file") MultipartFile file) throws Exception {
    var user = userRepository.findDistinctByUsername(authentication.getName())
        .orElseThrow(() -> new IllegalStateException("Unable to find current user"));


    // TODO: A cool optimisation is to use each subsequent thumbnail generated, to generate the next smaller one
    var media = this.mediaRepository.save(Media.from(user, file));
    this.entityManager.flush();
    this.fileStoreService.save(file, media.getFilename());
    var xxxx = Math.min(media.getWidth(), media.getHeight());
    Thumbnails.of(fileStoreService.getRawPath().resolve(media.getFilename()).toFile())
        .outputFormat("jpg")
        .size(192, 192)
        .outputQuality(1f)
        .sourceRegion(Positions.CENTER, xxxx, xxxx)
        .toFile(fileStoreService.getThumbnailPath(192).resolve(media.getThumbnailFilename()).toFile());
//    this.fileStoreService.saveThumbnail(thumbnailFor(media.getFilename(), 192), media.getThumbnailFilename(), 192);
  }

  private BufferedImage thumbnailFor(String filename, int targetWidth) throws Exception {
    var image = ImageIO.read(fileStoreService.getRawPath().resolve(filename).toFile());
    return removeAlpha(Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, targetWidth));
  }

  private static BufferedImage removeAlpha(BufferedImage image) {
    var rgbBufferedImage = new BufferedImage(image.getWidth(), image.getHeight(), TYPE_INT_RGB);
    var graphics = rgbBufferedImage.createGraphics();
    graphics.setColor(WHITE);
    graphics.fillRect(0, 0, image.getWidth(), image.getHeight());
    graphics.drawImage(image, 0, 0, null);
    graphics.dispose();

    return rgbBufferedImage;
  }
}
