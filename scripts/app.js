const cityForm = document.querySelector('form')

const updateCity = async (city) => {

    const cityDetail = await getCity(city)
    const weather = await getWeather(cityDetail.Key)

    return {
        cityDetail: cityDetail,
        weather: weather
    }
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // get city value
    let cityValue = cityForm.city.value.trim()
    cityForm.reset()

    // update ui with new city
    updateCity(cityValue)
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
})