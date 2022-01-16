const cityForm = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const { cityDetail, weather } = data

    // update template
    details.innerHTML = `
    <h5 class="my-3">${cityDetail.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    `;

    // update night/day 
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)

    let timeSrc = null;
    weather.IsDayTime ? timeSrc = 'img/day.svg' : timeSrc = 'img/night.svg'
    time.setAttribute('src', timeSrc)

    // remove display-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {

    const cityDetail = await getCity(city)
    const weather = await getWeather(cityDetail.Key)

    return { cityDetail, weather }
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get city value
    let cityValue = cityForm.city.value.trim()
    cityForm.reset()

    // update ui with new city
    updateCity(cityValue)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err))

    // set localStorage
    window.localStorage.setItem('city', cityValue)
})

localStorage.getItem('city') ? (
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
) : null