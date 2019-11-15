@authentication
Feature: Login: Register new user

    Scenario: Start authentication as new user
        Given I open the home page
        When I start authentication as "testuser"
        Then I am registering a new user of "testuser"

    Scenario: Registration with passwords that don't match
        Given I open the home page
        When I start authentication as "testuser"
        And I register with details:
            | Name            | Test User            |
            | Email Address   | testuser@example.com |
            | Password        | pa55w0rd             |
            | Repeat Password | password             |
        Then registration fails with errors:
            | Field           | Error                 |
            | Repeat Password | Passwords don't match |
