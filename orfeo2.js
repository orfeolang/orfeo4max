'use strict'

const max = require('max-api')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))
let headers = {
    'Accept': 'version=' + config.api.version,
    'Content-Type': 'application/json',
}

const getVersions = async (type) => {
    try {
        const response = await fetch(config.api.url + `/${type}/versions`, {
            headers: headers,
            method: 'GET',
        })
        if ( ! response.ok) {
            max.outlet({
                'message': `HTTP error ${response.status}`
            })
        }
        else
        {
            const json = await response.json()
            max.outlet(json)
        }
    } catch (error) {
        max.outlet({
            'message': `Error fetching data: ${error}`
        })
    }
}

max.addHandler('getApiVersions', async () => {
    getVersions('api')
})

max.addHandler('getCompilerVersions', async () => {
    getVersions('compiler')
})
