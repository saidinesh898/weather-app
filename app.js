const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

if (process.argv[2]) {
    geocode(process.argv[2], (error, data) => {
        if (error) {
            return console.log(error)
        } else {
            forcast(data.lat + ',' + data.long, (error, ForcastData) => {
                console.log(data.location)
                console.log(ForcastData)
            })
        }

    })
} else {
    console.log("Please provide a location")
}