const request = require('request')

const geocode = require('./geocode')
const forecast = require('./forecast')
const chalk = require('chalk')


// const url = 'http://api.weatherstack.com/current?access_key=d4c0a0d9c41d69a1953ab872e3d1f374&query=13.1155,77.6070';

// request({url: url, json : true}, (error, response) => {
//     //console.log(response.body.current)
//     if (error) {
//         console.log('unable to connect to weather services! ')
//     } else if(response.body.error) {
//         console.log('unable to find location')
//     } else {
//         console.log('it is currently ' + response.body.current.temperature + ' degrees out. it feels like ' + response.body.current.feelslike + ' degrees out. ')
//     }
    
// })

// geocode('india', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })


const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return console.log(chalk.red.bold(error))
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(chalk.red.bold(error))
            }

            console.log(chalk.green.bold(location))
            console.log(chalk.green.bold(forecastData))
        })
    })
}