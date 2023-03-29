const api = {
 Key: "Your open weather API KEY",
 baseURL: "https://api.openweathermap.org/data/2.5/",
 geoUrl: "http://api.openweathermap.org/geo/1.0/"
}

const newsapi = {
Key:"Your newsAPI KEY",
baseURL: "https://newsapi.org/v2/"
}

const timeAPI = {
Key:"Your TIME API KEY",
baseURL:"http://api.timezonedb.com/v2.1/"
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
    }).then(displayResults)
   // .catch(error =>{ 
   //     console.error();
   // });
}
function getCoordinates(coz){
    fetch(`${api.geoUrl}direct?q=${coz.name}&limit=4&appid=${api.Key}`)
    .then(response => {return response.json();})
    .then(data => {
        const lattitude = getLattitude(data);
        const longitude = getLongitude(data);
        console.log(longitude);
        console.log(lattitude);
        fetchTimeByLatLong(lattitude,longitude);
    })
}

function fetchTimeByLatLong(x,y){
    fetch(`${timeAPI.baseURL}get-time-zone?key=${timeAPI.Key}&format=json&by=position&lat=${x}&lng=${y}`)
    .then(response => {return response.json();})
    .then(data => {
        const TimeOfPlace = getTime(data);
        console.log(TimeOfPlace);
        let timeOnWebPage = document.querySelector('.date');
        timeOnWebPage.innerHTML = TimeOfPlace;
    })
}
function getTime(data){
    return data.formatted;
}

function getLattitude(data){
    return data[0].lat;
}
function getLongitude(data){
    return data[0].lon;
}

function getNews(comp){
    fetch(`${newsapi.baseURL}top-headlines?country=${comp.sys.country}&apiKey=${newsapi.Key}`)
    .then(response => response.json())
    .then(data => {
    const headlines = getHeadlines(data);
    const Description = getDescription(data);
    let newsHeadline = document.querySelector('.Headline');
    newsHeadline.innerHTML = `${headlines[0]}`
    let newsDescription = document.querySelector('.description');
    newsDescription.innerHTML = `${Description[0]}`
    const imgOfNews = getImage(data);
    let newsImage = document.querySelector('#image');
    newsImage.src = `${imgOfNews[0]}`
    })
}
function getDescription(data){
    if (data.status === "ok") {
        return data.articles.map(article => article.description);
    } else {
        console.error("NewsAPI request failed:", data.message);
    }
}

function getImage(data){
    if (data.status === "ok") {
        return data.articles.map(article => article.urlToImage);
    } else {
        console.error("NewsAPI request failed:", data.message);
    }
}

function getHeadlines(data) {
    // check if the API request was successful
    if (data.status === "ok") {
      // loop through each article and return an array of headlines
      return data.articles.map(article => article.title);
    } else {
      console.error("NewsAPI request failed:", data.message);
      return [];
    }
  }


function displayResults(weather){

    // let date = document.querySelector('.date');
    // date.innerHTML = dateBuilder(new Date());

    let temperature = document.querySelector('.absTemp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let tempRange = document.querySelector('.rangeTemp');
    tempRange.innerHTML = `${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;

    let weather_mood = document.querySelectorAll('.weather_mood');
    weather_mood[0].innerHTML = weather.weather[0].main;

    let city = document.querySelector('.city');
    city.innerHTML = `${weather.name} ${weather.sys.country}`;

    getNews(weather);

    getCoordinates(weather);
}


    // function dateBuilder (d) {
    //     let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    //     let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    //     let day = days[d.getDay()];
    //     let month = months[d.getMonth()];
    //     let date = d.getDate();
    //     let year = d.getFullYear();

    //     return `${day} ${date} ${month} ${year}`;
    // }