const request = require('request')

const geocode = (address, callback) => {
    const dir = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${dir}.json?access_token=pk.eyJ1IjoiaXZhbnZ6MjM4NCIsImEiOiJjanZwbXJwb2oyYWk2NDNtdTM2ZnRzY2puIn0.50s7DsdJoJ4Y6zDamYYevw&limit=1`

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const current = body.features[0]
            callback(undefined, {
                latitude: current.center[1],
                longitude: current.center[0],
                location: current.place_name
            })
        }    
    })
}

module.exports = geocode