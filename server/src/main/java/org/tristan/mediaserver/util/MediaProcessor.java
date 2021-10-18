package org.tristan.mediaserver.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.transaction.support.TransactionTemplate;
import org.tristan.mediaserver.repository.MediaRepository;
import org.tristan.mediaserver.service.FileStorageService;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.FileImageOutputStream;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.util.concurrent.TimeUnit;

import static javax.imageio.ImageWriteParam.MODE_EXPLICIT;

public class MediaProcessor implements Runnable {

  private final Logger log = LoggerFactory.getLogger(MediaProcessor.class);

  private static final ImageWriteParam WRITE_JPG_PARAM = new JPEGImageWriteParam(null);

  static {
    WRITE_JPG_PARAM.setCompressionMode(MODE_EXPLICIT);
    WRITE_JPG_PARAM.setCompressionQuality(.9f);
  }

  private final MediaRepository repository;

  private final TransactionTemplate tx;

  private volatile boolean running = false;

  public MediaProcessor(MediaRepository repository, TransactionTemplate tx) {
    this.repository = repository;
    this.tx = tx;
  }

  @Override
  public void run() {
    try {
      if (running) {
        return;
      }
      running = true;
      process();
      running = false;
    } catch (Exception e) {
      log.error("An unhandled exception occurred during image processing", e);
    }
  }

  private void process() {
    // TODO: Chunk results
    var start = System.nanoTime();

    var medias = tx.execute(s -> this.repository.findByProcessedFalseOrderByUploadedAtDesc());

    if (medias == null || medias.isEmpty()) {
//      log.error("Unable to find media to process");
      return;
    }

    medias.forEach(m -> {
      // TODO: Divide into threads
      var data = read(m.getFilename());
      var image = data.image;
      m.setMd5(data.md5);
      m.setWidth(image.getWidth());
      m.setHeight(image.getHeight());

      try {
        write(m.getThumbnailFilename(), thumbnail(image, 192), 192);
      } catch (IOException e) {
        log.error("Failed to create thumbnail for file: " + m.getOriginalFilename(), e);
        return;
      }

      m.setProcessed(true);
      tx.executeWithoutResult(s -> this.repository.save(m));
    });

    if (medias.size() > 0) {
      log.info(String.format("Processed %d media. Took %dms", medias.size(), TimeUnit.NANOSECONDS.toMillis(System.nanoTime() - start)));
    }
  }

  private static FileData read(String filename) {
    try {
      var file = FileStorageService.getRawPath().resolve(filename).toFile();
      var md = MessageDigest.getInstance("MD5");
      try (var is = new FileInputStream(file); var dis = new DigestInputStream(is, md)) {
        var image = ImageIO.read(dis);
        return new FileData(new String(Hex.encode(md.digest())), image);
      }
    } catch (Exception e) {
      throw new IllegalArgumentException("Unable to read file: " + filename, e);
    }
  }

  // TODO: A cool optimisation is to use each subsequent thumbnail generated, to generate the next smaller one
  private static BufferedImage thumbnail(BufferedImage input, int size) throws IOException {
    var sourceSize = Math.min(input.getHeight(), input.getWidth());

    var buf = Thumbnails.of(input)
        .crop(Positions.CENTER)
        .size(sourceSize, sourceSize)
        .asBufferedImage();

    return Thumbnails.of(buf)
        .scale((double) size / (double) sourceSize)
        .asBufferedImage();
  }

  private static void write(String filename, BufferedImage buffer, int size) throws IOException {
    var output = FileStorageService.getThumbnailPath(size).resolve(filename).toFile();
    var jpgWriter = ImageIO.getImageWritersByFormatName("jpg").next();
    jpgWriter.setOutput(new FileImageOutputStream(output));
    jpgWriter.write(null, new IIOImage(buffer, null, null), WRITE_JPG_PARAM);
    jpgWriter.dispose();
  }

  private static class FileData {
    public final String md5;
    public final BufferedImage image;

    private FileData(String md5, BufferedImage image) {
      this.md5 = md5;
      this.image = image;
    }
  }

}
