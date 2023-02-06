
let searchButton = $("#search-button");
let searchInput = $("#search-input");

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

let tomorrowTemp = $("#tomorrowTemp");
let tomorrowWind = $("#tomorrowWind");
let tomorrowHum = $("#tomorrowHum");

let twoDayTemp = $("#twoDayTemp");
let twoDayWind = $("#twoDayWind");
let twoDayHum = $("#twoDayHum");

let threeDayTemp = $("#threeDayTemp");
let threeDayWind = $("#threeDayWind");
let threeDayHum = $("#threeDayHum");

let fourDayTemp = $("#fourDayTemp");
let fourDayWind = $("#fourDayWind");
let fourDayHum = $("#fourDayHum");

let fiveDayTemp = $("#fiveDayTemp");
let fiveDayWind = $("#fiveDayWind");
let fiveDayHum = $("#fiveDayHum");

let today = moment().format("DD/MM/YYYY")
let tomorrow = moment().add(1,'days').format("DD/MM/YYYY")
let twodaysahead = moment().add(2,'days').format("DD/MM/YYYY")
let threedaysahead = moment().add(3,'days').format("DD/MM/YYYY")
let fourdaysahead = moment().add(4,'days').format("DD/MM/YYYY")
let fivedaysahead = moment().add(5,'days').format("DD/MM/YYYY");






currHour = moment().hour();





function defaultUI () {
 
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

function newSearch () {
   
    city = searchInput.val().trim();
    previousSearches.push(city)
  

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



function getWeather(lat, lng) {


    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" 
    + lat + "&lon=" + lng + "&appid=92d34bb00ccad506b8b2254447f3b90f&units=metric";
    
    console.log(queryURL);
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        let results = response;
        console.log(results);

        UpdatePage(results)

     });

    }

    

    function UpdatePage(obj) {
        let setTomorrow 


        if (currHour < 3){
            setTomorrow = 7; }
        if (currHour >= 3 && currHour <= 6) {
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
                
        
     console.log(setTomorrow);


   $(currentCity).text(obj.city.name + "(" + today + ")");
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


for (let i = 0; i < 8 ; i++) {
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

/*
fiveTemps.push((obj.list[i + 32 + setTomorrow].main.temp / 8));
fiveWinds.push((obj.list[i+ 32 + setTomorrow].wind.speed / 8));
fiveHums.push((obj.list[i + 32 + setTomorrow].main.humidity / 8));

fiveAvgTemp += (fiveTemps[i] / 8);
fiveAvgWind += (fiveWinds[i] / 8);
fiveAvgHum += (fiveHums[i] / 8);
*/
} 


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


$(fiveDayTemp).text("Temp: " + (parseFloat(obj.list[36].main.temp).toFixed(2)) + "°");
$(fiveDayWind).text("Wind: " + (parseFloat(obj.list[36].wind.speed).toFixed(2)) + " KPH");
$(fiveDayHum).text("Humidity: " + (parseFloat(obj.list[36].main.humidity).toFixed(2)) + " %");


    }




    // loc search



    defaultUI () 
$(searchButton).click(function (e) { 
    e.preventDefault();

newSearch();





console.log(previousSearches);


});



 /*
    <searchresults timestamp="Sat, 07 Nov 09 14:42:10 +0000" querystring="135 pilkington, avenue birmingham" polygon="true">
    <place
      place_id="1620612" osm_type="node" osm_id="452010817"
      boundingbox="52.548641204834,52.5488433837891,-1.81612110137939,-1.81592094898224"
      lat="52.5487429714954" lon="-1.81602098644987"
      display_name="135, Pilkington Avenue, Wylde Green, City of Birmingham, West Midlands (county), B72, United Kingdom"
      class="place" type="house">
      <geokml>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>-1.816513,52.548756599999997 -1.816434,52.548747300000002 -1.816429,52.5487629 -1.8163717,52.548756099999999 -1.8163464,52.548834599999999 -1.8164599,52.548848100000001 -1.8164685,52.5488213 -1.8164913,52.548824000000003 -1.816513,52.548756599999997</coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </geokml>
      <house_number>135</house_number>
      <road>Pilkington Avenue</road>
      <village>Wylde Green</village>
      <town>Sutton Coldfield</town>
      <city>City of Birmingham</city>
      <county>West Midlands (county)</county>
      <postcode>B72</postcode>
      <country>United Kingdom</country>
      <country_code>gb</country_code>
    </place>
  </searchresults>

  */