'use strict'

const maxApi = require('max-api')
const fs = require('fs')
const orfeo = require('@orfeo/orfeo')
const timelineValidator = require('@orfeo/timeline-validator')

const ORFEO_EXT = 'orfeo'
const TIMELINE_EXT = 'timeline'
const DICT_ID = process.argv.slice(2)[0]

function getFileExtension (filename) {
  const parts = filename.split('.')
  const ext = parts[parts.length - 1]
  return parts.length > 1 ? ext : undefined
}

function timelineToJSON (timeline) {
  const json = { events: [] }
  const lines = timeline.split('\n')
  lines.forEach(line => {
    line = line.trim()
    if (line !== '') {
      const parts = line.split(' ')
      const timepoint = parts[0]
      parts.shift()
      const datum = parts.join(' ').trimStart()
      json.events.push({
        timepoint: timepoint,
        datum: datum,
      })
    }
  })
  return json
}

maxApi.addHandler('read', filename => {
  const ext = getFileExtension(filename)
  if (ext !== ORFEO_EXT && ext !== TIMELINE_EXT) {
    maxApi.post('Orfeo Error: Unsupported File Extension. Use .orfeo or .timeline')
    maxApi.outlet(1)
  } else {
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
/* -----------------------------------------------------------------------------
  Copyright (c) 2019-2020, Pierre-Emmanuel Lévesque
  License: MIT
----------------------------------------------------------------------------- */
