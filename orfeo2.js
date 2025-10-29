'use strict'

const maxApi = require('max-api')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

maxApi.addHandler('getApiVersions', async () => {
    try {
        const response = await fetch(config.urlBase + 'versions', {
            method: 'GET',
            headers: config.headers,
        })
        const json = await response.json()
        maxApi.post(data)
    } catch (error) {
        maxApi.post(error)
    }
})
