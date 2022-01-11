
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    let location =  position.coords.latitude+','+position.coords.longitude
    fetch(`/current-weather/?location=${location}`).then((response) => {
        response.json().then((data) => {
            data = data.ForcastData
            updateWeather(data)
        })
    })


  }


getLocation()


// function fetchWeather(address, callback) {
//     return fetch('/weather?location=chennai' + address)
//         .then((response) => {
//             return response.json().then((data) => {
//                 return data.ForcastData;
//             }).catch((err) => {
//                 console.log(err);
//             })
//         });
// }


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



function updateWeather(data) {
    temp_c.textContent = data.temp_c + " °C"
    city.textContent = data.name
    state.textContent = data.region + ","
    country.textContent = " " + data.country
    uv.textContent = data.uv
    humidity.textContent = data.humidity
    feelslike_c.textContent = data.feelslike_c
    msg.textContent = "" + data.condition.text
        //svg.textContent = data.svg
    document.getElementById("Formlocation").value = data.name
    document.getElementById("weatherSVG").src = "./svg/" + data.svg;


}


const d = new Date();

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let day = weekday[d.getDay()];


const time = new Date().toLocaleTimeString('en-US', {
    hour12: true,
    hour: "numeric",
    minute: "numeric"
});

const date = new Date().toLocaleDateString();

document.getElementById("time").innerHTML = time;
document.getElementById("date").innerHTML = day + " " + date;


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const address = search.value
    let jsonData;
    fetchWeather(address).then((data) => {
        updateWeather(data)
        var mainContainer = document.getElementById("myData");

    })
})