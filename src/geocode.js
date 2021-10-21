const request = require("postman-request")
const dotenv = require("dotenv")
dotenv.config()
MaxboxAPI_Token = process.env.MAPBOX_API_KEY


const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + MaxboxAPI_Token + "&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location Service", undefined)
        } else if (response.body.features.length == 0) {
            callback("Cannot Find your Location", undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode