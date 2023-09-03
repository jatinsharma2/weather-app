// DOM MANIPULATION

const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const weatherIcon = document.querySelector('.weather-icon')
const weather = document.querySelector('.weather')
const error = document.querySelector('.error')

const input = document.getElementById('input')
const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let cityName = input.value.toLowerCase()
    checkWeather(cityName)
})

const apiKEY = '107ef404c65a9c895e8281740cf6a631'
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

async function checkWeather(cityName) {
    const response = await fetch(apiURL + `&q=${cityName}&appid=${apiKEY}`)
    const data = await response.json()

    if (response.status == 404) {
        error.style.display = 'block'
        weather.style.display = 'none'
    } else {
        // to display data
        weather.style.display = 'block'
        error.style.display = 'none'

        // to change data
        city.innerHTML = data.name
        temp.innerHTML = Math.round(data.main.temp) + `°c`
        humidity.innerHTML = data.main.humidity + `%`
        wind.innerHTML = data.wind.speed.toFixed(1) + ` km/h`

        // to change images
        let condition = data.weather[0].main.toLowerCase()
        let imgSrc = `images/${condition}.png`
        weatherIcon.src = imgSrc
    }
}
