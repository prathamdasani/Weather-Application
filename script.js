document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let location = document.getElementById('locationInput').value.trim();
    
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(location) {
    const apiKey = 'f8e2be4e35ae68b8c60bee1a71ef328d'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            
           
            displayWeather(data);
        })
        .catch(error => {
            console.error('There was a problem fetching the weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} &deg;C</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
    `;
}
