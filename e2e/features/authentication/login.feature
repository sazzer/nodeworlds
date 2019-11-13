@authentication
Feature: Login: Login a existing user

    Scenario: Start authentication as an existing user
        Given a user exists with details:
            | Username | testuser |
        And I open the home page
        When I start authentication as "testuser"
        Then I am logging in as "testuser"
