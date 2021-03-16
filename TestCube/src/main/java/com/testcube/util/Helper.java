package com.testcube.util;

import com.testcube.driver.Driver;
import lombok.Getter;
import netscape.javascript.JSObject;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Properties;

public class Helper {

    public static final String WORK_DIR = System.getProperty("user.dir");

    public static Logger LOGGER = Logger.getLogger(Helper.class);
    @Getter
    private static final String BASE_URL = System.getProperty("baseUrl");

    public static String getValueFromProperties(final String key, final String file) {

        String path = WORK_DIR
                + "/src/main/resources/"
                + file + ".properties";
        Properties appProps = new Properties();
        String result = "No value for key " + key;
        try {
            appProps.load(new FileInputStream(path));
            result = appProps.getProperty(key);
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
        return result;
    }

    public static JSONObject getPages () throws IOException{

        return new JSONObject(FileUtils
                .readFileToString(new File(WORK_DIR
                                + "/src/main/resources/pages.json"),
                StandardCharsets.UTF_8));
    }
}
