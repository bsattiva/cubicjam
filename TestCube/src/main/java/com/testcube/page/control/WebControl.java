package com.testcube.page.control;


import com.testcube.interfaces.Control;
import lombok.Getter;
import lombok.Setter;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;


public class WebControl implements Control {

    @Getter @Setter
    private WebElement element;
    private WebDriver driver;
    private WebDriverWait wait;
    private JavascriptExecutor executor;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String selector;

    @Getter
    @Setter
    private Selector locator;

    private static final int DEFAULT_WAIT = 15;
    private static final String CLICK_SCRIPT = "arguments[0].click()";
    private static final String SCROLL_SCRIPT = "arguments[0].scrollIntoView()";
    private static final String TEXT_SCRIPT = "return arguments[0].value";
    private static final String INNER_TEXT_SCRIPT = "return arguments[0].innerHTML";
    private static final String SET_TEXT_SCRIPT = "arguments[0].value='?'";
    private static final String SET_ATTRIBUTE_SCRIPT = "arguments[0].setAttribute('?','?')";
    private static final String MASK = "\\?";

    public enum Selector {
        ID, SELECTOR, XPATH, TAG_NAME, CLASS_NAME, LINK_TEXT, PARTIAL_LINK_TEXT
    }

    public WebControl(final String name,
                      final String selector,
                      final WebDriver driver) {
        this.name = name;
        this.selector = selector;
        this.driver = driver;
        this.locator = Selector.SELECTOR;
        populateWait();
        populateExecutor();
        populateElement();
    }



    public WebControl(final String name,
                      final String selector,
                      final WebDriver driver,
                      final int interval) {
        this.name = name;
        this.selector = selector;
        this.driver = driver;
        this.locator = Selector.SELECTOR;
        populateWait(interval);
        populateExecutor();
        populateElement();
    }



    public WebControl(final String name,
                      final String selector,
                      final WebDriver driver,
                      final Selector locator) {
        this.driver = driver;
        this.selector = selector;
        this.locator = locator;
        populateWait();
        populateExecutor();
        populateElement(locator);
    }

    public WebControl(final String name,
                      final String selector,
                      final WebDriver driver,
                      final Selector locator,
                      final String value) {
        this.driver = driver;
        this.selector = selector.replace("?", value);
        this.locator = locator;
        populateWait();
        populateExecutor();
        populateElement(locator);
    }



    public WebControl(final WebElement element,
                      final WebDriver driver) {
        this.element = element;
        this.driver = driver;
        this.locator = Selector.SELECTOR;
        populateExecutor();
        populateWait();
    }

    private void populateElement(final Selector sel) {
        element = wait
                .until(ExpectedConditions
                        .presenceOfElementLocated(getLocator(sel)));
    }



    private By getLocator(Selector sel) {
        By locator = null;
        switch (sel) {
            case ID:
                locator = By.id(selector);
                break;

            case SELECTOR:
                locator = By.cssSelector(selector);
                break;

            case XPATH:
                locator = By.xpath(selector);
                break;

            case TAG_NAME:
                locator = By.tagName(selector);
                break;

            case CLASS_NAME:
                locator = By.className(selector);
                break;

            case LINK_TEXT:
                locator = By.linkText(selector);
                break;

            case PARTIAL_LINK_TEXT:
                locator = By.partialLinkText(selector);
                break;
        }

        return locator;
    }

    public void populateElement() {
        element = wait
                .until(ExpectedConditions
                        .presenceOfElementLocated(By
                                .cssSelector(selector)));
    }

    public void populateElementWithXpath() {
        element = wait
                .until(ExpectedConditions
                        .presenceOfElementLocated(By.xpath(selector)));
    }

    private void populateWait() {
        wait = new WebDriverWait(driver, DEFAULT_WAIT);
    }

    private void populateWait(final int interval) {
        wait = new WebDriverWait(driver, interval);
    }

    private void populateExecutor() {
        executor = (JavascriptExecutor) driver;
    }

    public void click() {
        wait.until(ExpectedConditions
                .elementToBeClickable(getLocator(locator)))
                .click();
    }

    public void forceClick() {
        executor.executeScript(CLICK_SCRIPT, element);
    }

    public void scrollAndClick() {
        executor.executeScript(SCROLL_SCRIPT, element);
        executor.executeScript(CLICK_SCRIPT, element);
    }

    public void scrollTo() {
        executor.executeScript(SCROLL_SCRIPT, element);
    }

    public void selectByValue(final String value) {
        Select select = new Select(wait.until(ExpectedConditions
                .elementToBeClickable(By.cssSelector(selector))));
        select.selectByValue(value);
    }

    public void selectByIndex(final int index) {
        Select select = new Select(wait.until(ExpectedConditions
                .elementToBeClickable(By.cssSelector(selector))));
        select.selectByIndex(index);
    }

    public void selectByText(final String text) {
        Select select = new Select(wait.until(ExpectedConditions
                .elementToBeClickable(By.cssSelector(selector))));
        select.selectByVisibleText(text);
    }

    public void sendKeys(final String keys) {
        element.clear();
        element.sendKeys(keys);
    }

    public void setText(final String text) {
        executor.executeScript(SET_TEXT_SCRIPT.replace(MASK, text), element);
    }

    public String getText() {
        return wait.until(ExpectedConditions
                .presenceOfElementLocated(getLocator(locator)))
                .getText();
    }

    public String getTextValue() {
        return (String) executor.executeScript(TEXT_SCRIPT, element);
    }

    public String getInnerText() {
        return (String) executor.executeScript(INNER_TEXT_SCRIPT, element);
    }

    public void clear() {
        wait.until(ExpectedConditions
                .elementToBeClickable(By.cssSelector(selector)));
    }

    public String getAttribute(final String key) {
        return element.getAttribute(key);
    }

    public void setAttribute(final String key, final String value) {
        executor
                .executeScript(SET_ATTRIBUTE_SCRIPT
                        .replaceFirst(MASK, key)
                        .replaceFirst(MASK, value), element);
    }

    public boolean isSelected() {
        return element.isSelected();
    }

    public boolean isDisplayed() {
        return element.isDisplayed();
    }

    public boolean isEnabled() {
        return element.isEnabled();
    }

    public Point getLocation() {
        return element.getLocation();
    }

    public Dimension getSize() {
        return element.getSize();
    }

    public Rectangle getRect() {
        return element.getRect();
    }

    public String getCssValue(final String arg) {
        return element.getCssValue(arg);
    }

    public void hitKey(final String key) {

        switch (key.toUpperCase()) {
            case "ENTER":
                element.sendKeys(Keys.ENTER);
                break;
            case "ESCAPE":
                element.sendKeys(Keys.ESCAPE);
                break;
            case "BACK":
                element.sendKeys(Keys.BACK_SPACE);
                break;
            default:
                throw new AssertionError("Unsupported Key: " + key);

        }

    }
}
