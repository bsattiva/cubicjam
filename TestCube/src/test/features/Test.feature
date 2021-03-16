Feature:

  Scenario: Google Death Star
    Given I am on "login" page
    When I populate field "loginText" with "-username"
    And I populate field "passwordText" with "-password"
    And I click on "submitButton"
    Then I am on "bannerList" page
    When I click on "newBanner"
    Then I am on "selectBanner" page
    When I wait for 500 milliseconds
    When I click on "searchBanner"
    Then I am on "createBanner" page
    When I populate field "bannerName" with "newBanner"
    And I populate field "searchTerms" with "0123344"
    And I hit Enter
    And I populate field "startDate" with "01-01-2028"
    And I populate field "endDate" with "10-02-2028"
    And I scroll to the element "linkTypeToggle"
    And I click on "storeToggle"
    When I wait for 500 milliseconds
    And I click on field "storeLink" with "00234"
    And I click on "bannerToggle"
    And I click on field "bannerLink" with "B2B"
    And I click on "linkTypeToggle"
    And I click on field "linkTypeLink" with "ABSOLUTE_WEB_ADDRESS"
    And I wait for 100 milliseconds
    And I scroll to the top of the page
    And I click on "uploadButton"
    And I wait for 100 milliseconds
    And I upload file to field "uploadInput"
    And I populate field "altText" with "alt text"
    And I force cick on "createButton"
    Then I am on "list" page
#    When I populate field "textSearch" with "death star"
#    And I hit Enter
#    Then I am on "searchResults" page
#    And I can see list of "results"
#    And the page contains field "result" with "Death Star"
#    When I force click on field "resultLink" with "Death Star"
#    Then I am navigating to another page