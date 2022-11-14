
function attachEvents() {
    console.log("TODO...");
    document.getElementById("submit").addEventListener("click", getWeather)
 debugger
}
 
async function getWeather() {
    const currentSection = document.getElementById("current");
    const upcomingContainer = document.getElementById("upcoming");
    const forecastContainer = document.getElementById("forecast");
 
    try {
        const url = "http://localhost:3030/jsonstore/forecaster/locations";
        const townName = document.getElementById("location").value;
        const response = await fetch(url);
        const data = await response.json();
 
        const info = data.find(x => x.name === townName);
        const [todayData, upcomingData] = await Promise.all([
            getToday(info.code),
            getUpcoming(info.code)
        ])
 
        forecastContainer.style.display = "block"
        const todayHTMLTemp = createToday(todayData);
        currentSection.appendChild(todayHTMLTemp);
 
        const upcomingHTMLTemp = createUpcoming(upcomingData);
        upcomingContainer.appendChild(upcomingHTMLTemp)
    } catch (e) {
        forecastContainer.style.display = "block"
        document.querySelector(".label").textContent = "Error";
    }
}
 
async function getToday(code) {
    const urlToday = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
    const response = await fetch(urlToday);
    const dataToday = await response.json();
    return dataToday
}
 
async function getUpcoming(code) {
    const urlUpcoming = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
    const response = await fetch(urlUpcoming);
    const data = await response.json();
    return data
}
 
function createUpcoming(data) {
    const container = document.createElement("div");
    container.classList.add("forecast-info");
 
    data.forecast.forEach(data => {
        const spanHolder = generateSpans(data);
        container.appendChild(spanHolder);
    });
 
    return container;
}
 
function generateSpans(data) {
    const enumIcon = {
        "Sunny": "&#x2600", // ☀
        "Partly sunny": "&#x26C5", // ⛅
        "Overcast": "&#x2601", // ☁
        "Rain": "&#x2614", // ☂
        "Degrees": "&#176"   // °
 
    }
    const { condition, high, low } = data
    const spanHolder = document.createElement("span");
    spanHolder.classList.add("upcoming");
 
    const iconSpan = document.createElement("span");
    iconSpan.classList.add("symbol");
    iconSpan.innerHTML = enumIcon[condition];
 
    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`
 
    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("forecast-data");
    conditionSpan.textContent = condition
 
    spanHolder.appendChild(iconSpan)
    spanHolder.appendChild(tempSpan)
    spanHolder.appendChild(conditionSpan);
 
    return spanHolder;
}
 
function createToday(data) {
    const enumIcon = {
        "Sunny": "&#x2600", // ☀
        "Partly sunny": "&#x26C5", // ⛅
        "Overcast": "&#x2601", // ☁
        "Rain": "&#x2614", // ☂
        "Degrees": "&#176"   // °
 
    }
    const { condition, high, low } = data.forecast
    const conditionContainer = document.createElement("div");
 
 
    conditionContainer.classList.add("forecasts");
 
    const conditionIconSpan = document.createElement("span");
    conditionIconSpan.classList.add("condition", "symbol");
    conditionIconSpan.innerHTML = enumIcon[condition];
 
    const conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");
 
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("forecast-data");
    nameSpan.textContent = data.name;
 
    const tempSpan = document.createElement("span");
    tempSpan.classList.add("forecast-data");
    tempSpan.innerHTML = `${low}${enumIcon["Degrees"]}/${high}${enumIcon["Degrees"]}`
 
 
    const conditionTxtSpan = document.createElement("span");
    conditionTxtSpan.classList.add("forecast-data");
    conditionTxtSpan.textContent = condition;
 
    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(conditionTxtSpan);
 
    conditionContainer.appendChild(conditionIconSpan);
    conditionContainer.appendChild(conditionSpan);
    return conditionContainer;
}
 
attachEvents();
// let city = document.querySelector("#location");
// let divForecast = document.querySelector("#forecast");
// let current = document.querySelector("#current");
// let upcoming = document.querySelector("#upcoming");
// let baseUrl = 'http://localhost:3030/jsonstore/forecaster';
// let code = '';

// let weatherSymbols = {
//     "Sunny": '\u2600',//"Sunny": "&#x2600", // ☀
//     "Partly sunny": '\u26c5',
//     "Overcast": '\u2601',
//     "Rain": '\u2602',
//     "Degrees": '\u00b0'
// };

// function attachEvents() {
//     let getButton = document.querySelector("#submit");
//     getButton.addEventListener('click', getForecast);
// }
// async function getForecast() {
//     try {
//         if (city.value) {
//             code = await getCode();
//             let today = await getTodayForecast();

//             if (current.children[1]) {
//                 current.children[1].remove();
//                 upcoming.children[1].remove();
//             }
//             divForecast.style.display = 'block';
//             upcoming.style.display = 'block';
//             current.querySelector('.label').textContent = "Current conditions"

//             let [condition, high, low] = Object.values(today.forecast);
//             let divForecasts = htmlGenerator('div', '', current, 'forecasts')
//             htmlGenerator('span', `${weatherSymbols[condition]}`, divForecasts, 'condition symbol');
//             let spanCondition = htmlGenerator('span', '', divForecasts, 'condition');
//             htmlGenerator('span', today.name, spanCondition, 'forecast-data');
//             htmlGenerator('span', `${low}${weatherSymbols["Degrees"]}/${high}${weatherSymbols["Degrees"]}`, spanCondition, 'forecast-data');
//             htmlGenerator('span', condition, spanCondition, 'forecast-data');

//             let threeDay = await getThreeDayForecast();
//             let divForecastInfo = htmlGenerator('div', '', upcoming, 'forecast-info');
//             for (let day of Object.values(threeDay.forecast)) {
//                 let spanUpcoming = htmlGenerator('span', '', divForecastInfo, 'upcoming');
//                 htmlGenerator('span', `${weatherSymbols[day.condition]}`, spanUpcoming, 'symbol');
//                 htmlGenerator('span', `${day.low}${weatherSymbols["Degrees"]}/${day.high}${weatherSymbols["Degrees"]}`, spanUpcoming, 'forecast-data');
//                 htmlGenerator('span', day.condition, spanUpcoming, 'forecast-data');
//             }
//         } else {
//             throw new Error();
//         }
//     } catch (error) {
//         return clearInfo();
//     }
// }
// async function getCode() {
//     let response = await fetch(`${baseUrl}/locations`);
//     let data = await response.json();
//     code = '';

//     Object.values(data).forEach(x => {
//         if (x.name === city.value) {
//             code = x.code;
//         };
//     });
//     city.value = '';
//     return code;
// }
// async function getTodayForecast() {
//     let response = await fetch(`${baseUrl}/today/${code}`);
//     if (!response.ok) {
//         throw new Error();
//     }
//     let json = await response.json();
//     if (!json) {
//         throw new Error();
//     }
//     return json;
// }

// async function getThreeDayForecast() {
//     let response = await fetch(`${baseUrl}/upcoming/${code}`);
//     if (!response.ok) {
//         throw new Error();
//     }
//     let json = response.json();
//     if (!json) {
//         throw new Error();
//     }
//     return json;
// }
// function htmlGenerator(tagName, text, parent, className) {
//     let el = document.createElement(tagName);
//     el.textContent = text;
//     el.className = className;

//     if (parent) {
//         parent.appendChild(el);
//     }
//     return el;
// }
// function clearInfo() {
//     current.querySelector('.label').textContent = "Error"
//     upcoming.style.display = 'none';
// }
// attachEvents()

