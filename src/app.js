const path = require ('path')
const express = require('express')
const hbs = require ('hbs')
const getGeoLocationCode = require('./utils/geolocation.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

//Set path of express configuration
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join (__dirname, '../templates/views')
const partialPath = path.join (__dirname, '../templates/partials')

//Set express handlebars for view engine and views path 
app.set('view engine', 'hbs')
app.set ('views', viewPath)
hbs.registerPartials(partialPath)

// Static path location
app.use (express.static(publicPath))

app.get ('', (req, res) => {
    res.render ('index', {
        title: 'Weather',
        name: 'Ash Verma'
    })
})

app.get ('/about', (req, res) => {
    res.render ('about', {
        title: 'About the author',
        name: 'Ash Verma'
    })
})

app.get ('/help', (req, res) => {
    res.render ('help', {
        title: 'Help',
        helpText: 'This is help about the application.',
        name: 'Ash verma'
    })
})

app.get ('/weather', (req, res) => {
    if (!req.query.address) {
        // console.log('1111')
        return res.send ('You must provide the address.')
    }

    getGeoLocationCode (req.query.address, (error, data) => {
        if (error) {
            // console.log('22222')
            return res.send ('Location not found. Try another search')
        } 

        forecast (data.longitude, data.latitude, (error, forecastData) => {
            if (error) {
                return res.send (error)
            }
            res.send ({
                forecast: forecastData.summary + '. With temprate of ' + forecastData.temperature + '.',
                location: data.placeName,
                address: req.query.address
            })
        })

    })
})

app.get ('/help/*', (req, res) => {
    res.render ('error', {
        title: 'Help Error',
        errorText: 'Help article not found.',
        name: 'Ash Verma'
    })
})

app.get ('*', (req, res) => {
    res.render ('error', {
        title: 'Error',
        errorText: 'Page not found.',
        name: 'Ash Verma'

    })
})

app.listen(port, () => {
    console.log ("Server is up on port : " + port)
})