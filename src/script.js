// LOOK AT MAKING THE DATA OBJECT SEPARATE WITH ITS OWN LOAD CITY FUNCT - then you can just pass it into each individual funct

// Creating 1 global variable here for the current location's data that can be used when needing to flip between F/C temps
let data = undefined; 

// This runs to automatically fill out the page with the weather for Austin, TX
async function loadDefault() {
    try {
        const response = await fetch(
            "https://api.weatherapi.com/v1/current.json?key=8f6804f1b072413ca08204636231807&q=austin",
            { mode: "cors" }
        );
        data = await response.json();
        // Uses the fetched data to build the page details
        loadHeader(data);
        loadBodyF(data);
        //Sets event listener to the search button to run the loadlocation function - only needed on initial load
        const searchBtn = document.getElementById("search-btn");
        searchBtn.addEventListener("click", loadLocation);
        //creates a listener on the checkbox element that toggles between F and C temps
        const tempToggle = document.getElementById("temp-toggle");
        tempToggle.addEventListener("click",changeTempFormat);
    } catch (err) {
        alert(err);
    }
}


async function loadLocation() {
    const searchText = document.getElementById("search-bar").value;
    try {
        const response = await fetch(
            "https://api.weatherapi.com/v1/current.json?key=8f6804f1b072413ca08204636231807&q=" +
            searchText,
            { mode: "cors" }
        );
        data = await response.json();
        clearData();
        // Uses the fetched data to build the page details
        loadHeader(data);
        loadBodyF(data);
    } catch (err) {
        alert(err.error.message);
    }
}

// Displays the city name at the top of the box
async function loadHeader(data) {
    const headerCity = document.getElementById("city");
    headerCity.innerHTML = `${data.location.name}, ${data.location.region}`;
}

// Builds the body of fahrenheit temps with the fetched data
async function loadBodyF(data) {
    const bodyContent = document.getElementById("body-content");

    const weatherIcon = document.createElement("img");
    weatherIcon.alt = "current weather icon";
    weatherIcon.className = "weather-icon";
    let weatherIconUrl = data.current.condition.icon;
    weatherIcon.src = "https:" + weatherIconUrl;

    const actualTemp = document.createElement("p");
    actualTemp.innerHTML = `${data.current.temp_f}°F`;
    actualTemp.className = "actual-temp";
    actualTemp.id = "actual-temp";

    const feelsTemp = document.createElement("p");
    feelsTemp.innerHTML = `Feels like  ${data.current.feelslike_f}°F`;
    feelsTemp.className = "feels-temp";
    feelsTemp.id = "feels-temp";

    const humidity = document.createElement("p");
    humidity.innerHTML = `Humidity is ${data.current.humidity}%`;
    humidity.className = "humidity";
    humidity.id = "humiditiy";

    const condition = document.createElement("p");
    condition.innerText = `Current conditions - ${data.current.condition.text}`;
    condition.className = "condition";
    condition.id = "condition";

    bodyContent.appendChild(weatherIcon);
    bodyContent.appendChild(actualTemp);
    bodyContent.appendChild(feelsTemp);
    bodyContent.appendChild(humidity);
    bodyContent.appendChild(condition);
}

// Builds the body of celsius temps with the fetched data
async function loadBodyC(data) {
    const bodyContent = document.getElementById("body-content");

    const weatherIcon = document.createElement("img");
    weatherIcon.alt = "current weather icon";
    weatherIcon.className = "weather-icon";
    let weatherIconUrl = data.current.condition.icon;
    weatherIcon.src = "https:" + weatherIconUrl;

    const actualTemp = document.createElement("p");
    actualTemp.innerHTML = `${data.current.temp_c}°C`;
    actualTemp.className = "actual-temp";
    actualTemp.id = "actual-temp";

    const feelsTemp = document.createElement("p");
    feelsTemp.innerHTML = `Feels like  ${data.current.feelslike_c}°C`;
    feelsTemp.className = "feels-temp";
    feelsTemp.id = "feels-temp";

    const humidity = document.createElement("p");
    humidity.innerHTML = `Humidity is ${data.current.humidity}%`;
    humidity.className = "humidity";
    humidity.id = "humiditiy";

    const condition = document.createElement("p");
    condition.innerText = `Current conditions - ${data.current.condition.text}`;
    condition.className = "condition";
    condition.id = "condition";

    bodyContent.appendChild(weatherIcon);
    bodyContent.appendChild(actualTemp);
    bodyContent.appendChild(feelsTemp);
    bodyContent.appendChild(humidity);
    bodyContent.appendChild(condition);
}

function clearData() {
    const headerData = document.getElementById("city");
    const bodyData = document.getElementById("body-content");

    headerData.innerHTML = "";
    bodyData.innerHTML = "";
}

function clearBody() {
    const bodyData = document.getElementById("body-content");
    bodyData.innerHTML = "";
}


function changeTempFormat() {
    const tempToggle = document.getElementById("temp-toggle");
    if (tempToggle.checked === true) {
        clearBody();
        loadBodyC(data);
    } else {
        clearBody();
        loadBodyF(data);
    }
}

loadDefault();
