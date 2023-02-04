const api = {
 Key: "c3bf9deb816976b4e7615c416db9b08a",
 baseURL: "https://api.openweathermap.org/data/2.5/"
}
const spotiapi = {
baseURL:"https://api.spotify.com/v1"
}

const Searchbox = document.querySelector('.searchbox');
Searchbox.addEventListener('keypress',event => {
    if(event.keyCode == 13){
        console.log("success");
        getResults(Searchbox.value);
    }
})


function getResults(query){
    fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.Key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults).then(getMusic)
   // .catch(error =>{ 
   //     console.error();
   // });
}

function displayResults(weather){

    let date = document.querySelector('.date');
    date.innerHTML = dateBuilder(new Date());

    let temperature = document.querySelector('.absTemp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let tempRange = document.querySelector('.rangeTemp');
    tempRange.innerHTML = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let weather_mood = document.querySelectorAll('.weather_mood');
    weather_mood[0].innerHTML = weather.weather[0].main;

    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name},${weather.sys.country}`;


}

    function dateBuilder (d) {
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

    function getMusic(weather_mood){
        fetch(``)
    }