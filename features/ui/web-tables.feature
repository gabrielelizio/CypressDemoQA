Feature: Web Tables Operations

  @ui @web-tables
  Scenario: CRUD operations on web tables
    Given I access the demoqa website
    When I navigate to "Elements" -> "Web Tables"
    And I create a new record
    And I edit the newly created record
    And I delete the newly created record
    Then the record should be removed from the table

  @bonus @web-tables
  Scenario: Create and delete multiple records
    Given I access the demoqa website
    When I navigate to "Elements" -> "Web Tables"
    And I create 12 new records dynamically
    And I delete all 12 records
    Then the table should be empty
