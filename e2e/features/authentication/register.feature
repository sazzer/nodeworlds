@authentication
Feature: Login: Register new user

    Scenario: Start authentication as new user
        Given I open the home page
        When I start authentication as "testuser@example.com"
        Then I am registering a new user of "testuser@example.com"

    Scenario: Registration with passwords that don't match
        Given I open the home page
        When I start authentication as "testuser@example.com"
        And I register with details:
            | Name            | Test User |
            | Password        | pa55w0rd  |
            | Repeat Password | password  |
        Then registration fails with errors:
            | Passwords don't match |
