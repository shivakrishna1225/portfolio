const apiKey = '6921b8d6f179030e1429d45302fae634';
const getWeatherButton = document.getElementById('getWeather'); // Corrected button ID
const cityInput = document.getElementById('city');
const weatherDataDiv = document.getElementById('weatherData'); // Corrected div ID

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Correct variable and added trim to remove spaces
    if (city) {
        getWeather(city);
    } else {
        weatherDataDiv.innerHTML = '<p>Please enter a city name.</p>';
    }
});

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod == 200) {
            displayWeather(data);
        } else {
            weatherDataDiv.innerHTML = '<p>City not found. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        weatherDataDiv.innerHTML = '<p>Error fetching the data. Please check your internet connection.</p>';
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherDataDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}
