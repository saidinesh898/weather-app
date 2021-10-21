const request = require("postman-request")
const dotenv = require("dotenv")
dotenv.config()
weatherAPI_Token = process.env.WEATHER_API_KEY

const forcast = (coordinates, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=' + weatherAPI_Token + '&q=' + coordinates + '&aqi=yes'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather Service", undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, {
                temp_c: response.body.current.temp_c,
                temp_f: response.body.current.temp_f,
                condition: response.body.current.condition,
                feelslike_c: response.body.current.feelslike_c,
                feelslike_f: response.body.current.feelslike_f,
                humidity: response.body.current.humidity,
                uv: response.body.current.uv,
                name: response.body.location.name,
                region: response.body.location.region,
                country: response.body.location.country,
            })
        }
    })

}

module.exports = forcast