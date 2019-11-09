@authentication
Feature: Login: Register new user

    Scenario: Start authentication as new user
        Given I open the home page
        When I start authentication as "testuser@example.com"
        Then I am registering a new user of "testuser@example.com"
