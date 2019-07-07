const request = require('request')

const getForecast = (long, lat, callback ) => {
    const urlDarkSkyWeather = 'https://api.darksky.net/forecast/22f5aab36943fae4c4d270146e4a7005/' + long + ',' + lat + '?units=si'
    request ({url: urlDarkSkyWeather, json: true}, (error, response) => {
        // console.log (response.body)
        if (error) {
            callback ('Server not reachable. Try after sometime !', undefined)
        } else if (response.body.error != null) {
            callback ('Location co-ordinates are not correct. Please provide correct coordinates.')
        } else {
            callback (undefined, {
                temperature: response.body.currently.temperature,
                humidity: response.body.currently.humidity,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.currently.summary
            })    
        }
    })
}

module.exports = getForecast