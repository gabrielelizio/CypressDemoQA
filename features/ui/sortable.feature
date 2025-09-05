Feature: Sortable Elements

  @ui @sortable
  Scenario: Reorder elements in ascending order
    Given I access the demoqa website
    When I navigate to "Interactions" -> "Sortable"
    And I drag and drop elements to ascending order
    Then the elements should be in ascending order
