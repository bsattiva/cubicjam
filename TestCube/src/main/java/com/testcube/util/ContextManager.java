package com.testcube.util;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Map;

public class ContextManager {

    private static final ThreadLocal<Map> SAVED_VALUES = new ThreadLocal<>();

    public static void  setWebDriver(final Map map) {
        SAVED_VALUES.set(map);
    }
}
