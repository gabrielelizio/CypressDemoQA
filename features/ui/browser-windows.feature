Feature: Browser Windows Handling

  @ui @browser-windows
  Scenario: Handle new browser window
    Given I access the demoqa website
    When I navigate to "Alerts, Frame & Windows" -> "Browser Windows"
    And I click the "New Window" button
    Then a new window should open with message "This is a sample page"
    When I close the new window
    Then I should return to the main window
