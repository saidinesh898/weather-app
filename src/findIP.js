const express = require('express')
const request = require("postman-request")

const app = express()

console.log(app.remoteAddress)
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7)
}