
let searchButton = $("#search-button");
let searchInput = $("#search-input");

let city = "london"
let coordinates = []

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

let today = moment().format("DD/MM/YYYY")
let tomorrow = moment().add(1,'days').format("DD/MM/YYYY")
let twodaysahead = moment().add(2,'days').format("DD/MM/YYYY")
let threedaysahead = moment().add(3,'days').format("DD/MM/YYYY")
let fourdaysahead = moment().add(4,'days').format("DD/MM/YYYY")
let fivedaysahead = moment().add(5,'days').format("DD/MM/YYYY");



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
       console.log(city); 
    city = searchInput.val().trim()

  

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

let tomorrowAvgTemp = 0
let tomorrowAvgWind = 0
let tomorrowAvgHum = 0

for (let i = 0; i < 5; i++) {
tomorrowAvgTemp += (obj.list[i].main.temp / 5);
tomorrowAvgWind += (obj.list[i].wind.speed / 5)
tomorrowAvgHum += (obj.list[i].main.humidity / 5);
} 
$(tomorrowTemp).text("Temp: " + (parseFloat(tomorrowAvgTemp).toFixed(2)) + "°");
$(tomorrowWind).text("Wind: " + (parseFloat(tomorrowAvgWind).toFixed(2)) + " KPH");
$(tomorrowHum).text("Humidity: " + (parseFloat(tomorrowAvgHum).toFixed(2)) + " %");

   $(currentCity).text(obj.city.name + "(" + today + ")");
   $(currentTemp).text("Temp: " + obj.list[0].main.temp + "°");
   $(currentWind).text("Wind: " + obj.list[0].wind.speed + " KPH");
   $(currentHum).text("Humidity: " + obj.list[0].main.humidity + "%");



    }


    // loc search



    defaultUI () 
$(searchButton).click(function (e) { 
    e.preventDefault();

newSearch();








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