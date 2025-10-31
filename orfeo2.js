'use strict'

const CONFIG_FILE = 'config.json'
const ORFEO_EXT = 'orfeo'
const MUSICLINE_EXT = 'musicline'

// -------------------------------------------------------------------

const max = require('max-api')
const fs = require('fs')

const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
let headers = {
    'Accept': 'version=' + config.api.version,
    'Content-Type': 'application/json',
}

// -------------------------------------------------------------------

const getVersions = async (type) => {
    try {
        const response = await fetch(`${config.api.url}/${type}/versions`, {
            headers: headers,
            method: 'GET',
        })
        const json = await response.json()
        if ( ! response.ok) {
            max.post(`Error HTTP ${response.status}: ${json.message}`)
        }
        else {
            max.post(json)
        }
    }
    catch (e) {
        max.post(`Error Fetching Data: ${e}`)
    }
}

max.addHandler('getApiVersions', async () => {
    getVersions('api')
})

max.addHandler('getCompilerVersions', async () => {
    getVersions('compiler')
})

// -------------------------------------------------------------------




/*
const getFileExtension = (filename) => {
    const parts = filename.split('.')
    const ext = parts[parts.length - 1]
    return parts.length > 1 ? ext : undefined
}

max.addHandler('read', filename => {
    const ext = getFileExtension(filename)
    if (ext !== ORFEO_EXT && ext !== MUSICLINE_EXT) {
        max.outlet({
            'message': `Read Error: Unsupported File Extension. Use ${ORFEO_EXT} or ${MUSICLINE_EXT}`
        })
    }
    else
    {









        fs.readFile(filename, 'utf8', async function (err, contents) {
            if ( ! e) {
                try {
                        // Compile on Server.
                    let musiclineFile
                    if (ext === ORFEO_EXT) {
                        try {
                            const response = await fetch(config.api.url + `/${type}/versions`, {
                                headers: headers,
                                method: 'POST',
                                body: contents
                            })
                            if ( ! response.ok) {
                                max.outlet({
                                    'message': `Server Error: HTTP ${response.status}`
                                })
                                // We will need an error here...
                                // throw error.
                            }
                            else {
                                const json = await response.json()
                                musiclineFile =
                            }
                        } catch (err) {
                            max.outlet({
                                'message': `Server Error: Fetching Data. ${err}`
                            })
                        }
                    }
                    else
                    {
                        musiclineFile = contents
                    }











                } catch (e) {

                }
            }
            else
            {
                max.post('Orfeo: ' + err)
            }
        })
    }


/*
  else {
    fs.readFile(filename, 'utf8', async function (err, contents) {
      if (!err) {
        try {
          const timelineFile = ext === ORFEO_EXT
            ? orfeo(contents)
            : contents
          timelineValidator(timelineFile)
          const dictContents = timelineToJSON(timelineFile)
          await maxApi.setDict(DICT_ID, dictContents)
          maxApi.post(`Orfeo: ${filename} was read successfully.`)
          maxApi.outlet(0)
        } catch (e) {
          maxApi.post('Orfeo ' + e)
          maxApi.outlet(1)
        }
      } else {
        maxApi.post('Orfeo ' + err)
        maxApi.outlet(1)
      }
    })
  }

})
*/
