const geocode = require('./src/geocode')
const forcast = require('./src/forcast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()


const viewsPath = path.join(__dirname, '../weather-app/templates/views')
const partialsPath = path.join(__dirname, '../weather-app/templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../weather-app/public')))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
        console.log(ip)
    }
    forcast(location = ip, (error, ForcastData) => {
        console.log(ip)
        if (error) {
            return res.send({
                error
            })
        }
        res.render('index', {
            ForcastData
        })
    })

    // res.render('index', {
    //     title: 'Weather App',
    //     temp: 30,
    //     location: "Chennai is Great",
    //     svg: "cloudy.svg"
    // })
})

app.get('/help', (req, res) => {
    console.log(app.remoteAddress)
    res.sendStatus(503)

})
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: "You must provide an Address"
        })
    }
    geocode(req.query.location, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            forcast(data.lat + ',' + data.long, (error, ForcastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    data,
                    ForcastData,
                })
            })
        }

    })

})





app.listen(443, () => {
    console.log('server started on port ', 80)
})





// if (process.argv[2]) {
//     geocode(process.argv[2], (error, data) => {
//         if (error) {
//             return console.log(error)
//         } else {
//             forcast(data.lat + ',' + data.long, (error, ForcastData) => {
//                 console.log(data.location)
//                 console.log(ForcastData)
//             })
//         }

//     })
// } else {
//     console.log("Please provide a location")
// }