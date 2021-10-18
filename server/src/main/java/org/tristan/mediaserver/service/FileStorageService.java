package org.tristan.mediaserver.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FileStorageService {

  private static final Path root = Paths.get("public", "media");

  private static final List<Integer> THUMB_SIZES = List.of(16, 32, 64, 128, 192);

  public FileStorageService() {
    createDirectories(root);
    createDirectories(getRawPath());
    THUMB_SIZES.forEach(size -> createDirectories(getThumbnailPath(size)));
  }

  private static void createDirectories(Path path) {
    try {
      Files.createDirectories(path);
    } catch (IOException e) {
      throw new RuntimeException("Could not initialize folder for upload! " + path.toAbsolutePath());
    }
  }

  public void save(MultipartFile file, String filename) {
    try {
      Files.copy(file.getInputStream(), getRawPath().resolve(filename));
    } catch (Exception e) {
      throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
    }
  }

  public static Path getRawPath() {
    return root.resolve("raw");
  }

  public static Path getThumbnailPath(int size) {
    return root.resolve("thumbs-" + size);
  }

  public void saveThumbnail(BufferedImage image, String filename, int size) {
    try {
      ImageIO.write(image, "jpg", getThumbnailPath(size).resolve(filename).toFile());
    } catch (IOException e) {
      throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
    }
  }

}
