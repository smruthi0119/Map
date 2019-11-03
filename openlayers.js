var ourLoc;
var view;
var map;


function init(){
  ourLoc=ol.proj.fromLonLat([-74.005974,40.712776]);
  view= new ol.View({
    center:ourLoc,
    zoom:6
  });

  map=new ol.Map({
    target:'map',
    layers: [
      new ol.layer.Tile({
        source:new ol.source.OSM()
      })
    ],
    loadTilesWhileAnimating:true,
    view: view
  });
}

function panhome(){
  view.animate({
    center:ourLoc,
    duration:2000
  });
}
function panToLocation(){
  var countryName= document.getElementById("country-name").value;
  if(countryName===""){
    alert("You didn't enter a country name!");
    return;
  }
  var query="https://restcountries.eu/rest/v2/name/"+countryName;
  query=query.replace(/ /g, "%20");
  alert(query);
  var countryRequest=new XMLHttpRequest();
  countryRequest.open('GET', query, false);
  countryRequest.send();


if(countryRequest.readyState!=4 ||  countryRequest.status!= 200 || countryRequest.responseText===""){
  window.console.error("Request had an error");
  return;
}
var countryInformation=JSON.parse(countryRequest.responseText);
var lat= countryInformation[0].latlng[0];
var lon= countryInformation[0].latlng[1];

window.console.log(countryName + ": lon " +lon + " & lat" +lat);
var location=ol.proj.fromLonLat([lon,lat]);
view.animate({
  center:location,
  duration:2000
});
  // alert("Ready State"+ countryRequest.readyState);
  // alert("Status " + countryRequest.status);
  // alert("response" + countryRequest.responseText);
}
window.onload = init;
