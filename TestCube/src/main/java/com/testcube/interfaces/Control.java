package com.testcube.interfaces;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.Rectangle;

public interface Control {

    void click();
    void forceClick();
    void selectByValue(final String value);
    void selectByIndex(final int index);
    void selectByText(final String text);
    void sendKeys(final String keys);
    String getText();
    void clear();
    String getAttribute(final String key);
    boolean isSelected();
    boolean isEnabled();
    boolean isDisplayed();
    Point getLocation();
    Dimension getSize();
    Rectangle getRect();
    String getCssValue(String var1);

}
