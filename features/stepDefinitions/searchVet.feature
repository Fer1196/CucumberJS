Feature: Search Text 
    Scenario: Search Text on google
        Given I visit "<url>"
        When I search for Techverito "<name>" and "<surname>"
        Then I should see the results

Examples:
    | url | name | surname |
    | http://localhost:4200/petclinic/vets/add  | Juan | Ibarra  |
    | http://localhost:4200/petclinic/vets/add  | Pedro | Jhon |



