package com.testcube.driver;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.apache.log4j.Logger;

import java.net.MalformedURLException;

import java.net.URL;


public class Driver {
    public static Logger LOGGER = Logger.getLogger(Driver.class);
    public static WebDriver getDriver(final String browser) {
        WebDriver driver = null;
        switch (browser.toUpperCase()) {
            case "CHROME":
                ChromeOptions options = new ChromeOptions();
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver(options);
                break;
            case "FIREFOX":
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
                break;


        }
        return driver;
    }

    public static String getHubUrl() {
        return "http://localhost:4444/wd/hub/";
    }

    public static WebDriver getRemoteDriver(final String url, final String browser) {

        WebDriver driver = null;
            switch (browser.toUpperCase()) {
                case "CHROME":
                    try {
                        driver = new RemoteWebDriver(new URL(url), new ChromeOptions());
                    } catch (MalformedURLException e) {
                        LOGGER.error(e.getLocalizedMessage());
                    }
                    break;
                case "FIREFOX":
                    try {
                        driver = new RemoteWebDriver(new URL(url), new FirefoxOptions());
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                    }
                    break;
            }
        return driver;
    }
}
