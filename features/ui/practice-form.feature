Feature: Practice Form Submission

  @ui @practice-form
  Scenario: Submit practice form with random data
    Given I access the demoqa website
    When I navigate to "Forms" -> "Practice Form"
    And I fill all form fields with random values
    And I upload a test file
    And I submit the form
    Then a confirmation popup should appear
    When I close the popup
    Then the form should be successfully submitted
