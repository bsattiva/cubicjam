package com.middle.MiddleService;

import com.auth.Authorization;
import org.apache.log4j.Logger;
import org.apache.tomcat.util.http.fileupload.IOUtils;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;


@RestController
@EnableAutoConfiguration
@CrossOrigin(origins = "*", allowedHeaders = "*")
@SpringBootApplication
public class MiddleServiceApplication {

	private static final Logger LOGGER = Logger.getLogger(MiddleServiceApplication.class);

	@PostMapping("/crop")
	public String cropeImage(final HttpServletRequest request,
							 final HttpServletResponse response){
		if (Authorization.isAutorized(request, null)) {
			Part partFile = null;

			InputStream fileStream = null;


			try {
				partFile = request.getPart("file");

				fileStream = (partFile != null) ? partFile.getInputStream() : null;
				BufferedImage image = ImageIO.read(fileStream);

				int initialHeight = image.getHeight();
				int initialWidth = image.getWidth();

				int height = 0;
				int width = 0;

				int oH = 0;
				int oW = 0;

				double aspect = initialHeight / initialWidth;

				if (aspect > 0.75) {

					width = initialWidth;
					height = (int) (width * 0.75);


				}
				else if (aspect < 0.75 && aspect > 0.5) {
					{
						height = initialHeight;
						width = initialWidth;
					}
				} else {
					oW = 40;
					height = initialHeight;
					width = initialWidth - oW -10;
				}


				BufferedImage resizedImage = image.getSubimage(oW, oH, width, height);
				ByteArrayOutputStream out = new ByteArrayOutputStream();
				ImageIO.write(resizedImage, "jpeg", out);
				byte[] bitmapdata = out.toByteArray();
 				ByteArrayInputStream bs = new ByteArrayInputStream(bitmapdata);
				IOUtils.copy(bs, response.getOutputStream());
			} catch (IOException e) {
				LOGGER.error(e.getMessage());
			} catch (ServletException ex) {

				LOGGER.error("COULD NOT RESIZE IMAGE: " + ex.getMessage());
			}
		}
		return "";
	}

	public static void main(String[] args) {
		SpringApplication.run(MiddleServiceApplication.class, args);
	}

}
