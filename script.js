
let searchButton = $("#search-button");
let searchInput = $("#search-input");

let historyButtonsCont = $("#history");

let city = "london"
let coordinates = [];
let previousSearches = [];

let currentCity = $("#currentCity");
let currentTemp = $("#currentTemp");
let currentWind = $("#currentWind");
let currentHum = $("#currentHum");

let tomorrowTitle = $("#tomorrow").text(moment().add(1,'days').format("DD/MM/YYYY"));
let twoDaysTitle = $("#twoDaysAhead").text(moment().add(2,'days').format("DD/MM/YYYY"));
let threeDayTitle = $("#threeDaysAhead").text(moment().add(3,'days').format("DD/MM/YYYY"));
let fourDayTitle = $("#fourDaysAhead").text(moment().add(4,'days').format("DD/MM/YYYY"));
let fiveDayTitle = $("#fiveDaysAhead").text(moment().add(5,'days').format("DD/MM/YYYY"));

let tomorrowIcon = $("#tomorrowIcon");
let tomorrowTemp = $("#tomorrowTemp");
let tomorrowWind = $("#tomorrowWind");
let tomorrowHum = $("#tomorrowHum");

let twoDayIcon = $("#twoDayIcon");
let twoDayTemp = $("#twoDayTemp");
let twoDayWind = $("#twoDayWind");
let twoDayHum = $("#twoDayHum");

let threeDayIcon = $("#threeDayIcon");
let threeDayTemp = $("#threeDayTemp");
let threeDayWind = $("#threeDayWind");
let threeDayHum = $("#threeDayHum");

let fourDayIcon = $("#fourDayIcon");
let fourDayTemp = $("#fourDayTemp");
let fourDayWind = $("#fourDayWind");
let fourDayHum = $("#fourDayHum");

let fiveDayIcon = $("#fiveDayIcon");
let fiveDayTemp = $("#fiveDayTemp");
let fiveDayWind = $("#fiveDayWind");
let fiveDayHum = $("#fiveDayHum");

let today = moment().format("DD/MM/YYYY")
let tomorrow = moment().add(1,'days').format("DD/MM/YYYY")
let twodaysahead = moment().add(2,'days').format("DD/MM/YYYY")
let threedaysahead = moment().add(3,'days').format("DD/MM/YYYY")
let fourdaysahead = moment().add(4,'days').format("DD/MM/YYYY")
let fivedaysahead = moment().add(5,'days').format("DD/MM/YYYY");

storedSearches = JSON.parse(localStorage.getItem("searches"));  //gets previous searches from local storage and adds them to array 
if (storedSearches !== null) {
    previousSearches = previousSearches.concat(storedSearches)
}

function historyButtons() {
    historyButtonsCont.empty();



previousSearches.forEach(function(city){

let btn = $("<button>").text(city);
btn.attr("city", (city));
btn.addClass("searchHistory")
historyButtonsCont.append(btn);




}
)


$("#history").on("click", ".searchHistory", function (event) {
    event.preventDefault();
    const search = $(event.target);
    const searchCity = search.attr("city");
   
city = searchCity;
newSearch ()
});




}



currHour = moment().hour(); 
historyButtons()








function defaultUI () {   //loads up default city 
    
 city = "london";



 mapURl = "https://api.opencagedata.com/geocode/v1/json?key=e0eb644af1b9429aa38bfea473c0aaa4&q=" 
 + city + "&pretty=1&no_annotations=1"

 $.ajax({
     url: mapURl,
     method: "GET"
 }).then(function (response) {
     let locresults = response;


 


 let lat = locresults.results[0].geometry.lat
 let long = locresults.results[0].geometry.lng

     coordinates.push(lat, long)


getWeather(lat, long)
   
})



}

function newSearch () {    // gets coordinates from entered city name 
  

    mapURl = "https://api.opencagedata.com/geocode/v1/json?key=e0eb644af1b9429aa38bfea473c0aaa4&q=" 
    + city + "&pretty=1&no_annotations=1"

    $.ajax({
        url: mapURl,
        method: "GET"
    }).then(function (response) {
        let locresults = response;
    

    let lat = locresults.results[0].geometry.lat
    let long = locresults.results[0].geometry.lng
   
        coordinates.push(lat, long)


getWeather(lat, long)
      
})



}



function getWeather(lat, lng) {   // uses coordinates to get weather info 


    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" 
    + lat + "&lon=" + lng + "&appid=92d34bb00ccad506b8b2254447f3b90f&units=metric";
    

    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let results = response;

console.log(results);
        UpdatePage(results)

     });

    }

    

function getIcon(code) {  // pulls relevent PNG file dependent on forecast icon code 
    
    let iconURL = "http://openweathermap.org/img/wn/" + code + "@2x.png" 

    

 return iconURL;

}


function UpdatePage(obj) {    // updates the page with relevent info
        let setTomorrow    
        

        if (currHour < 3){
            setTomorrow = 7; }
        if (currHour >= 3 && currHour <= 6) {  // tells the upcoming for loop where each day starts in order to get the daily average. 
            setTomorrow = 6; }
        if (currHour >= 6 && currHour <= 9) {
            setTomorrow = 5; }
        if (currHour >= 9 && currHour <= 12) {
            setTomorrow = 4 } 
        if (currHour  >= 12 && currHour <=15) {
            setTomorrow = 3 }
        if (currHour >= 15 && currHour <= 18) {
            setTomorrow = 2 } 
        if (currHour >= 21 && currHour <= 24) {
            setTomorrow = 0 }
                

            console.log(getIcon(obj.list[0].weather[0].icon))

   $(currentCity).text(obj.city.name + "(" + today + ")");
   $(currentIcon).attr("src", getIcon(obj.list[0].weather[0].icon));
   $(currentTemp).text("Temp: " + obj.list[0].main.temp + "°");
   $(currentWind).text("Wind: " + obj.list[0].wind.speed + " KPH");
   $(currentHum).text("Humidity: " + obj.list[0].main.humidity + "%");

let tomorrowAvgTemp = 0;
let tomorrowAvgWind = 0;
let tomorrowAvgHum = 0 ;

let twoTemps = [] ;
let twoWinds = [];
let twoHum =[];
let twoAvgTemp = 0;
let twoAvgWind = 0;
let twoAvgHum = 0;

let threeTemps =[] ;
let threeWinds =[];
let threeHums =[];
let threeAvgTemp = 0;
let threeAvgWind = 0;
let threeAvgHum = 0;

let fourTemps =[];
let fourWinds =[];
let fourHums =[];
let fourAvgTemp = 0;
let fourAvgWind = 0;
let fourAvgHum = 0;

let fiveTemps =[];
let fiveWinds=[];
let fiveHums =[];
let fiveAvgTemp = 0;
let fiveAvgWind = 0;
let fiveAvgHum = 0;
console.log(setTomorrow);

$(tomorrowIcon).attr("src", getIcon((obj.list[0 + setTomorrow + 3].weather[0].icon)));
$(twoDayIcon).attr("src", getIcon((obj.list[8 + setTomorrow + 3].weather[0].icon)));
$(threeDayIcon).attr("src", getIcon((obj.list[16 + setTomorrow + 3].weather[0].icon)));
$(fourDayIcon).attr("src", getIcon((obj.list[24 + setTomorrow + 3].weather[0].icon)));
$(fiveDayIcon).attr("src", getIcon((obj.list[32 + setTomorrow + 3].weather[0].icon)));

for (let i = 0; i < 8 ; i++) {    // loop to push data from weather array into daily arrays, to then calculate average from, day 5 being a single entry due to limitation within API 


tomorrowAvgTemp += (obj.list[i + setTomorrow ].main.temp / 8);
tomorrowAvgWind += (obj.list[i+ setTomorrow ].wind.speed / 8)
tomorrowAvgHum += (obj.list[i + setTomorrow ].main.humidity / 8);

twoTemps.push((obj.list[i + 8 + setTomorrow].main.temp));
twoWinds.push(obj.list[i+ 8 + setTomorrow].wind.speed )
twoHum.push(obj.list[i + 8 + setTomorrow].main.humidity);

twoAvgTemp += (twoTemps[i] / 8);
twoAvgWind += (twoWinds[i] / 8);
twoAvgHum += (twoHum[i] / 8);

threeTemps.push((obj.list[i + 16 + setTomorrow].main.temp ));
threeWinds.push( (obj.list[i+ 16 + setTomorrow].wind.speed ))
threeHums.push( (obj.list[i + 16 + setTomorrow].main.humidity));

threeAvgTemp += (threeTemps[i] / 8);
threeAvgWind += (threeWinds[i] / 8);
threeAvgHum += (threeHums[i] / 8);

fourTemps.push( (obj.list[i + 24 + setTomorrow].main.temp));
fourWinds.push( (obj.list[i+ 24 + setTomorrow].wind.speed));
fourHums.push( (obj.list[i + 24 + setTomorrow].main.humidity));

fourAvgTemp += (fourTemps[i] / 8);
fourAvgWind += (fourWinds[i] / 8);
fourAvgHum += (fourHums[i] / 8);

fiveTemps.push( (obj.list[i + 24 + setTomorrow].main.temp));
fiveWinds.push( (obj.list[i+ 24 + setTomorrow].wind.speed));
fiveHums.push( (obj.list[i + 24 + setTomorrow].main.humidity));

fiveAvgTemp += (fiveTemps[i] / 8);
fiveAvgWind += (fiveWinds[i] / 8);
fiveAvgHum += (fiveHums[i] / 8);



} 
/// updates the cards with new data on daily averages 

$(tomorrowTemp).text("Temp: " + (parseFloat(tomorrowAvgTemp).toFixed(2)) + "°");
$(tomorrowWind).text("Wind: " + (parseFloat(tomorrowAvgWind).toFixed(2)) + " KPH");
$(tomorrowHum).text("Humidity: " + (parseFloat(tomorrowAvgHum).toFixed(2)) + " %");

$(twoDayTemp).text("Temp: " + (parseFloat(twoAvgTemp).toFixed(2)) + "°");
$(twoDayWind).text("Wind: " + (parseFloat(twoAvgWind).toFixed(2)) + " KPH");
$(twoDayHum).text("Humidity: " + (parseFloat(twoAvgHum).toFixed(2)) + " %");

$(threeDayTemp).text("Temp: " + (parseFloat(threeAvgTemp).toFixed(2)) + "°");
$(threeDayWind).text("Wind: " + (parseFloat(threeAvgWind).toFixed(2)) + " KPH");
$(threeDayHum).text("Humidity: " + (parseFloat(threeAvgHum).toFixed(2)) + " %");

$(fourDayTemp).text("Temp: " + (parseFloat(fourAvgTemp).toFixed(2)) + "°");
$(fourDayWind).text("Wind: " + (parseFloat(fourAvgWind).toFixed(2)) + " KPH");
$(fourDayHum).text("Humidity: " + (parseFloat(fourAvgHum).toFixed(2)) + " %");


$(fiveDayTemp).text("Temp: " + (parseFloat(obj.list[32].main.temp).toFixed(2)) + "°");
$(fiveDayWind).text("Wind: " + (parseFloat(obj.list[32].wind.speed).toFixed(2)) + " KPH");
$(fiveDayHum).text("Humidity: " + (parseFloat(obj.list[32].main.humidity).toFixed(2)) + " %");

    }


defaultUI () ;  // loads up initial search of London 


$(searchButton).click(function (e) { 
    e.preventDefault();
    city = searchInput.val().trim();
     previousSearches.push(city);
     localStorage.setItem("searches", (JSON.stringify(previousSearches)));


historyButtons()
newSearch();




});



