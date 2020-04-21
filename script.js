mapboxgl.accessToken = 'pk.eyJ1IjoibWphciIsImEiOiJjazkxOGdkMnYwMWxyM2VrZmtiM3M5ODdlIn0.JRxPddMz6244HsVh_lpyCA';

// map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',

  center: [4.305009, 52.073591],
  zoom: 10,
});

//weer
function APIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='ad340a4db82351e75cdc734acdc61416';
	var city = 'scheveningen,nl';
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;

	fetch(request)
	
    .then((response) => {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
    })
    .then((data) => {
      console.log('Success:', data);
      succes(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function succes(response) {
	var type = response.weather[0].description;
	var temperatuur = Math.floor(response.main.temp - 273.15);
	var weatherBox = temperatuur + '&#176;C <br>' + type;

	//in popup op kaart
	console.log(weatherBox)
	var popup = new mapboxgl.Popup().setHTML('Het weer op deze plek: <br/>' + weatherBox);
	var marker = new mapboxgl.Marker().setLngLat([4.271035, 52.108961]).setPopup(popup).addTo(map);
}
APIdata();

