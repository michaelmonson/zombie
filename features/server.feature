Feature: Server Responds
  As a user,
  In order to use the service, 
  I want the server to have expected responses. 

  Scenario: Browse to the root path
    When I browse to "/"
    Then I expect a 200 status
    And I expect html

  Scenario: Browse to a non existant page
    When I browse to "/some/non/existant/page"
    Then I expect a 404 status
    And I expect html
    And I expect to see a h1 tag containing "404 Not Found"

