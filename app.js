const geocode = require('./src/geocode')
const forcast = require('./src/forcast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const app = express()


const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index')
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

app.get('/current-weather', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7)
    }
    location = req.query.location
    if (!location) {
        location = ip
    }
    forcast(location, (error, ForcastData) => {

        console.log(location)
        if (error) {
            return res.send({
                error
            })
        }

        res.send({
            ForcastData,
        })
    })

})

function lookupCode() {

    if (item == 1030) {
        console.log("Satisfied")
    } else {
        console.log("Not")
    }
}

app.get('/code', (req, res) => {

    const dataBuffer = fs.readFileSync('./public/code.json')
    const dataString = dataBuffer.toString()
    let dataJSON = (JSON.parse(dataString))
    const code = req.query.code
    console.log(dataJSON[code])
    res.send()
    fs.close()


})

let port = process.env.PORT || 80

app.listen(port, () => {
    console.log('server started on port ', port)
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