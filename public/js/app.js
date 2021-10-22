function fetchWeather(address, callback) {
    return fetch('/weather?location=' + address)
        .then((response) => {
            return response.json().then((data) => {
                return data.ForcastData;
            }).catch((err) => {
                console.log(err);
            })
        });
}


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const successMsg = document.querySelector('#message-1')
const errorMsg = document.querySelector('#message-2')
const temp_c = document.querySelector('#temp_c')
const city = document.querySelector('#city')
const state = document.querySelector('#state')
const msg = document.querySelector('#msg')
const country = document.querySelector('#country')
const svg = document.querySelector('#svg')
const uv = document.querySelector('#uv')
const humidity = document.querySelector('#humidity')
const feelslike_c = document.querySelector('#feelslike_c')
const Formlocation = document.querySelector('Formlocation')

fetch('/current-weather').then((response) => {
    response.json().then((data) => {
        data = data.ForcastData
        updateWeather(data)
    })
})

function updateWeather(data) {
    temp_c.textContent = data.temp_c
    city.textContent = data.name
    state.textContent = data.region
    country.textContent = data.country
    uv.textContent = data.uv
    humidity.textContent = data.humidity
    feelslike_c.textContent = data.feelslike_c
    msg.textContent = data.condition.text
    svg.textContent = data.svg
    document.getElementById("Formlocation").value = data.name

}



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    let jsonData;
    fetchWeather(address).then((data) => {
        updateWeather(data)

    })

})