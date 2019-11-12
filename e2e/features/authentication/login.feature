@authentication
Feature: Login: Login a existing user

    Scenario: Start authentication as an existing user
        Given a user exists with details:
            | Email Address | testuser@example.com |
        And I open the home page
        When I start authentication as "testuser@example.com"
        Then I am logging in as "testuser@example.com"
