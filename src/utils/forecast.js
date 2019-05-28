const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b9efcb72428633e0420fce5631aa5856/${latitude},${longitude}?units=si&lang=en`

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            const current = body.currently
            const sumary = body.daily.data[0].summary
            callback(undefined, `${sumary} It is currently ${current.temperature} degrees out. There is a ${current.precipProbability * 100}% chance of rain`)
        }    
    })
}

module.exports = forecast

