package com.testcube.page;

import com.testcube.page.control.WebControl;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.interactions.Actions;
import java.util.List;
import java.util.stream.Collectors;

public class Page {

    @Getter
    @Setter
    private JSONObject page;
    private WebDriver driver;

    private static final String SCROLL_UP_SCRIPT = "window.scrollTo(0,0)";

    @Getter
    @Setter
    private List<WebControl> pageList;

    public Page(final JSONObject pages, final String name, final WebDriver driver) {
        this.driver = driver;
        populate(pages, name);
    }

    private void populate(final JSONObject object, final String name) {
        page = object.getJSONObject(name);
    }

    public void scrollToTop() {
        ((JavascriptExecutor) driver).executeScript(SCROLL_UP_SCRIPT);
    }

    public WebControl getControl(final String name) {
        return new WebControl(name,
                page.getJSONObject(name).getString("selector"),
                driver,
                WebControl
                        .Selector
                        .valueOf(page
                                .getJSONObject(name)
                                .getString("locator")
                                .toUpperCase()));
    }

    public WebControl getControl(final String name, final String value) {
        return new WebControl(name,
                page.getJSONObject(name).getString("selector"),
                driver,
                WebControl
                        .Selector
                        .valueOf(page
                                .getJSONObject(name)
                                .getString("locator")
                                .toUpperCase()),
                value);
    }

    public void hitKey(final String key) {
        Actions actions = new Actions(driver);

        switch (key.toUpperCase()) {
            case "ENTER":
                actions.sendKeys(Keys.ENTER);
                break;
            case "ESCAPE":
                actions.sendKeys(Keys.ESCAPE);
                break;
            case "BACK":
                actions.sendKeys(Keys.BACK_SPACE);
                break;
            default:
                throw new AssertionError("Unsupported Key: " + key);

        }
        actions.perform();
    }

    public List<WebControl> getList(final String name) {
        return driver
                .findElements(By
                        .cssSelector(page
                                .getJSONObject(name)
                                .getString("selector")))
                .stream()
                .map(element -> new WebControl(element, driver))
                .collect(Collectors.toList());
    }



    public WebControl getControlByXpath(final String name) {
        return
                new WebControl(name,
                        page.getJSONObject(name)
                                .getString("selector"),
                        driver, WebControl.Selector.XPATH);
    }

    public void populatePageList(final String name) {
        pageList = driver
                .findElements(By
                        .cssSelector(page
                                .getJSONObject(name)
                                .getString("selector")))
                .stream()
                .map(element -> new WebControl(element, driver))
                .collect(Collectors.toList());
    }
}
