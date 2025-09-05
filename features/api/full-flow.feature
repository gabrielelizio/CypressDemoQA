Feature: API Test Flow - User Creation and Book Management

  @api @full-flow
  Scenario: Complete user creation and book rental flow
    Given I create a new user with username "testuser123" and password "P@ssw0rd123"
    Then the user should be created successfully
    When I generate an access token for the user
    Then the token should be generated successfully
    When I check if the user is authorized
    Then the user should be authorized
    When I get the list of available books
    Then I should see the list of books
    When I add two books to my collection
    Then the books should be added successfully
    When I get user details
    Then I should see the added books in my collection
