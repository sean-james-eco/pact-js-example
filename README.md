# misc / Running locally w/ docker

1. you do NOT need to run `npm run start:provider` unlike what it says below, if you're just running the tests and not the actual API

* * *

# PactJS Contract Testing Example

An example test framework using PactJS to validate contract testing between consumer and provider. The application that we are testing is a simple movies API which returns a list of movies. Please feel free to fork the repo to help with your contract testing learning.

## Running the Movies API locally

(do don't need to start the provider if you're just running the tests. it's started during the tests already. if you try to do both you'll get a port collision unless you change the settings)

Install dependencies:
`npm i`

Run the movies API:
`npm run start:provider`

## Running the GraphQL server

On another terminal, run:

`npm run start:graphql:server`

## Running the web consumer tests

Export these env vars, matching what's in docker-compose.yml for the pact broker ones.

```
export PACT_BROKER_URL=http://localhost:92
export PACT_BROKER_USERNAME=hello
export PACT_BROKER_PASSWORD=world
export GITHUB_SHA=v1.0.0
export GITHUB_BRANCH=main
```

Run the web consumer tests:
`npm run test:web:consumer`

Publish the contract to your pact broker:
`npm run publish:pact`

Run the provider tests:
`npm run test:provider`

## Running the GraphQL consumer tests

Run the GraphQL consumer tests:
`npm run test:graphql:consumer`

## Running tests as part of GitHub actions

To run the tests as part of a CI pipeline using GitHub actions, store the PACT_BROKER_URL and PACT_API_TOKEN as secrets to your forked repo.
