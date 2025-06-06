const { Verifier } = require('@pact-foundation/pact')
const { importData, server  } = require('./provider')

importData()
const port = 3001
const app = server.listen(port, () => {
    console.log(`Provider is running on port ${port}`)
})

const verifier = new Verifier({
    provider: 'MoviesApi',
    providerBaseUrl: `http://localhost:${port}`,
    pactBrokerUrl: process.env.PACT_BROKER_URL,
    pactBrokerToken: process.env.PACT_API_TOKEN,
    providerVersion: process.env.GIT_COMMIT_SHA || 'unknown',
    publishVerificationResult: true,
    consumerVersionTags: ['main'],
})

// verify contract
describe('Pact verification', () => {
    it('should validate the expectations of the consumer', async () => {
        return verifier
            .verifyProvider()
            .then((output) => {
                console.log('Pact verification complete')
                console.log('Result:', output)
            })
            .finally(() =>{
                app.close()
            })
    })
})