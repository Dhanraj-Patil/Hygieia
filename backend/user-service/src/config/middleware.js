const { auth } = require('express-oauth2-jwt-bearer')

const jwtCheck = auth({
    audience: "https://hygieia-auth-for-backend.com",
    issuerBaseURL: 'https://hygieia-auth.us.auth0.com/',
    tokenSigningAlg: 'RS256'
})

module.exports = jwtCheck