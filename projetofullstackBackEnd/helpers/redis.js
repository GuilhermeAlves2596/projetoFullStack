const cache = require('express-redis-cache')

cache = cache({
    prefix: 'redis',
    host: 'redis',
    port: 6379
})

module.exports = cache