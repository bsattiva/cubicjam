package glue;

import com.testcube.driver.Driver;
import com.testcube.page.Page;

import com.testcube.page.control.WebControl;
import com.testcube.util.Helper;
import com.testcube.util.TestHelper;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import org.json.JSONObject;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

import java.io.IOException;
import java.util.Date;

public class TestStepDefs {
    private WebDriver driver;
    private Page currentPage;
    private JSONObject pages;

    @Before
    public void prepare() {
      //  driver = Driver.getRemoteDriver(Driver.getHubUrl(), "chrome");
        driver = Driver.getDriver("chrome");
        driver.get(Helper.getBASE_URL());
        try {
            pages = Helper.getPages();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @After
    public void tearDown(Scenario scenario){

        if(scenario.isFailed()) {
            try {
                TestHelper.saveScreenshotAdHoc(scenario.getName() + new Date().getTime(), driver);
            } finally {
                if (driver != null) {
                    driver.quit();
                }
            }
        }


    }



    @When("I populate field {string} with {string}")
    public void iPopulateField(final String field, final String value) {

        String val = (!value.startsWith("-")) ? value : System.getProperty(value.substring(1));
        currentPage.getControl(field).sendKeys(val);
    }



    @When("I force cick on {string}")
    public void iForceClickOn(final String field) {
        currentPage.getControl(field).forceClick();
    }

//    @Then("^I can see field {string} value is {string}")
//    public void iCanSeeFieldValueIs(final String field, final String value) {
//        String text = currentPage.getControl(field).getText();
//        Assert.assertEquals(text, value);
//    }


    @Given("I navigated to {string} page")
    public void iNavigatedToPage(String urlKey) {

        String url = Helper.getValueFromProperties(urlKey, "url");
        driver.get(url.trim());
        currentPage = new Page(pages, urlKey, driver);
    }

//    @When("I populate field {string} with {string}")
//    public void iPopulateFieldWith(String field, String value) {
//    }

    @And("I click on {string}")
    public void iClickOn(String name) {
        currentPage.getControl(name).click();
    }

    @Then("I am on {string} page")
    public void iAmOnPage(String page) {
        currentPage = new Page(pages, page, driver);
    }

    @And("I hit Enter")
    public void iHitEnter() {
        currentPage.getControl("searchTerms").hitKey("ENTER");
    }

    @And("I can see list of {string}")
    public void iCanSeeListOf(String results) {
        Assert
                .assertNotEquals(currentPage.getList("listResults")
                        .size(),
                        0);

    }


    @And("the page contains field {string} with {string}")
    public void thePageContainsFieldWith(String field, String value) {
        WebControl control = currentPage.getControl(field, value);
        Assert.assertNotNull(control);
        Assert.assertTrue(control.getText().contains(value));
    }

    @When("I click on field {string} with {string}")
    public void iClickOnFieldWith(String field, String value) {
       currentPage.getControl(field, value).click();

    }

    @When("I force click on field {string} with {string}")
    public void iForceClickOnFieldWith(String field, String value) {
        currentPage.getControl(field, value).forceClick();
    }

    @And("I upload file to field {string}")
    public void iUploadFileToField(String field) {
        WebControl control = currentPage.getControl("uploadInput");
        String s = control.getSelector();

        control.sendKeys(currentPage.getPage().getJSONObject(field).getString("source"));
    }

    @When("I wait for {int} milliseconds")
    public void iWaitForMilliseconds(int mill) {
        try {
            Thread.sleep(mill);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @And("I scroll to the element {string}")
    public void iScrollToTheElement(String field) {
        currentPage.getControl(field).scrollAndClick();
    }

    @And("I scroll to the top of the page")
    public void iScrollToTheTopOfThePage() {
        currentPage.scrollToTop();
    }
}
