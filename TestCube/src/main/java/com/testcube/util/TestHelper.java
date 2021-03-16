package com.testcube.util;

import org.apache.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class TestHelper {
    public static Logger LOGGER = Logger.getLogger(TestHelper.class);
    public static void saveScreenshotAdHoc(final String name, final WebDriver driver) {
        TakesScreenshot shot = (TakesScreenshot) driver;
        File file = shot.getScreenshotAs(OutputType.FILE);
        String screenDirPath = System.getProperty("user.dir")
                + "/target/screenshots/";
        String shotPath = screenDirPath
                + "snap"
                + name
                + ".png";

        File dir = new File(screenDirPath);
        dir.mkdir();
        try {
            Files.move(file.toPath(), Path.of(shotPath));
        } catch (IOException e) {
            LOGGER.error("COULD NOT SAVE A SCREENSHOT: " + e.getMessage());
        }

    }

}
