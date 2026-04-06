# AI Stop Rules (MANDATORY)

These rules override all other instructions.

If any of the following conditions occur, the AI agent MUST STOP and FLAG the issue.

## Stop Conditions

1. Missing data model fields
2. Undefined API request/response structure
3. Conflicting documentation
4. Undefined tenant isolation behaviour
5. Missing environment variables
6. Missing migration instructions
7. Unclear folder/file placement

## Forbidden Behaviour

The AI MUST NOT:
- invent database fields
- invent API endpoints
- assume business logic
- create new architecture patterns
- rename existing domain concepts
- restructure folders without instruction

## Required Behaviour

If blocked:
- clearly state what is missing
- reference the exact document
- request clarification

## Principle

"If it is not defined, it does not exist."
