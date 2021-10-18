package org.tristan.mediaserver.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.stream.FileImageOutputStream;
import java.io.File;
import java.io.IOException;

import static javax.imageio.ImageWriteParam.MODE_EXPLICIT;

public class ThumbnailatorUtil {




//  private BufferedImage thumbnailFor(String filename, int targetWidth) throws Exception {
//    var image = ImageIO.read(fileStoreService.getRawPath().resolve(filename).toFile());
//    return removeAlpha(Scalr.resize(image, Scalr.Method.ULTRA_QUALITY, Scalr.Mode.FIT_TO_WIDTH, targetWidth));
//  }
//
//  private static BufferedImage removeAlpha(BufferedImage image) {
//    var rgbBufferedImage = new BufferedImage(image.getWidth(), image.getHeight(), TYPE_INT_RGB);
//    var graphics = rgbBufferedImage.createGraphics();
//    graphics.setColor(WHITE);
//    graphics.fillRect(0, 0, image.getWidth(), image.getHeight());
//    graphics.drawImage(image, 0, 0, null);
//    graphics.dispose();
//
//    return rgbBufferedImage;
//  }
}
