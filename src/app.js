const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//Define path or express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ivan Vazquez' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ivan Vazquez' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is the help page' 
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                title: 'About Me',
                name: 'Ivan Vazquez' ,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     title: 'About Me',
    //     name: 'Ivan Vazquez' ,
    //     address: req.query.address
    // })
})

app.get('/products', (req, resp) => {
    if (!req.query.search) {
        return resp.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)

    resp.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ivan Vazquez',
        errorMessage: 'Help article not found',
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ivan Vazquez',
        errorMessage: 'Page not found',
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})