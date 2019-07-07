const request = require('request')

const getGeoLocationCode = (location, callback) => {
    const urlMapboxGeoloc = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYXNoMTgxMCIsImEiOiJjanhnZ2plc2kwZm0wNDBwM3FvaDl6amUyIn0.TsRpMw2x5Zt9NgFHZQx9rA'
    // console.log (urlMapboxGeoloc)
    request ({url: urlMapboxGeoloc, json: true}, (error, response) => {
        // console.log ('Inside if ' + response.body.features.length === 0 )
        if (error) {
            // console.log ('Inside if ' + esponse.body.features.length )
            callback ('Server not available, please contact administrator.', undefined)

        } else if (response.body.features.length === 0) {
            // console.log ('Inside else if')
            callback ('Location not found, Try another location.', undefined)
        } else {
            // console.log ('Inside else')
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                placeName: response.body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoLocationCode