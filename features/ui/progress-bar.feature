Feature: Progress Bar Control

  @ui @progress-bar
  Scenario: Control and validate progress bar
    Given I access the demoqa website
    When I navigate to "Widgets" -> "Progress Bar"
    And I start the progress bar
    And I stop the progress before 25%
    Then the progress value should be less than or equal to 25%
    When I start the progress bar again
    And I wait for it to reach 100%
    And I reset the progress bar
    Then the progress bar should be reset to 0%
