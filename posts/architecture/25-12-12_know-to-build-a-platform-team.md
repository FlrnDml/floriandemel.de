
# Brainstorming
- Product
- Business Case
- "Domain"


- Introduction: Build a less complex abstraction for a complex Environment (Cloud/Ops)
    - Find the right interfaces to your dev teams
    - Build product people need and use
        - Communicate
    - Enabling users on the platform


# Sources
- https://services.google.com/fh/files/misc/designing_cloud_teams.pdf
- https://www.gartner.com/en/infrastructure-and-it-operations-leaders/topics/platform-engineering

## Platform Hype & Business Case
- Quick Time to market
- Less complex team technology scope
- Don't build complex infrastructure in each team, provide platform services that solve common problems

## Define Platform Products

- Architecture must define clearly which building blocks of a system are platform owned and which are owned by the team not - this depends on many parts
- Decoupling must be first priority
- Clear interfaces
- Clear ownership
- Platform teams should abstract (information hide) complex parts of the system, that can be packed behind a small and simple interface
- Platform teams should not provide wrappers for complex parts of the system, that must be understood by the teams anyways (HTTP Client) Or that do not provide value
    => Value = simple Abstraction of a complex topic -> making the life easier for the domain teams -> less time to market -> less cost -> less risk for new development

## Design clear user touchpoints with great developer interfaces (UX)

## Implement Feedback Quickly 
 
- Infrastructure Product Teams
- If products are bad or missing, you must either force the teams to use your product (bad) or build a product that is so good, that they want to use it. If you don't, no one will use it.

## Self-Service, Suppot and Enablement

- Enabling users on the platform
    - onboarding 
    - Learning / Enablement 
    - Documentation or 1o1 enablement? -> Size?
- Wait time / Ticket wait time costs money and peoples morale
    => Make user satisfaction a metric
    => Enable the teams to be quick, don't make them wait - DevOps - Platforms are part of dev!
