const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September"
, "October", "November", "December"];
const d = new Date();
document.querySelector(".date").innerText = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();

let weather = { "apiKey": "2ca75d1110ae297812a7b1ce517d89e7",
    fetchWeather: function(city){
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&APPID="
            +this.apiKey
        )
        .then(response => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const{temp, humidity} = data.main;
        const{speed} = data.wind;
        console.log(name, temp, speed, humidity, description);
        document.querySelector(".city").innerText = name;
        document.querySelector(".temp").innerText =  Math.round(temp) + "°";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = humidity + "% humidity";
        document.querySelector(".wind").innerText = speed + "km/h winds";
        document.querySelector(".main-temp").style.backgroundImage = "url('http://source.unsplash.com/1600x900/?" + name +"')";
    }
}
function search(){
    let newPlace = document.querySelector(".searchBar").value;
    setLocation(newPlace)
}
weather.fetchWeather('London');

function setLocation(placer){
    weather.fetchWeather(placer);
}

function saveForecast(){

    let tempCity = document.querySelector(".city").innerHTML;
    let tempTemp = document.querySelector(".temp").innerHTML;
    let tempDescription = document.querySelector(".description").innerHTML;
    let tempHumidity = document.querySelector(".humidity").innerHTML;
    let tempWind = document.querySelector(".wind").innerHTML;
    let tempDate = document.querySelector(".date").innerHTML;

    let word = `${tempCity}${tempTemp}${tempDescription}${tempHumidity}${tempWind}${tempDate}`
    let savedList = [word]
    console.log(localStorage.getItem("list"))
    localStorage.setItem("list", savedList)
}
function loadSaved(){
    //document.querySelector(".savedList").innerHTML = JSON.parse(localStorage.getItem("list"));
    console.log(JSON.parse(localStorage.getItem("list")));
    console.log(localStorage.getItem("list"))
    const node = document.createElement("div");
    const textnode = document.createTextNode(JSON.parse(localStorage.getItem("list")));
    node.appendChild(textnode);
    document.querySelector(".savedList").appendChild(node);
}
function clearSaved(){
    document.querySelector(".savedList").innerHTML = "";
    localStorage.clear();
}