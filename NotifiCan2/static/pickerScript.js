
var token = "{{ mapbox_access_token }}";
var longitude = 37.621667;
var latitude = 54.192105;
var trigger = false;
var marker;

console.log(token);
mapboxgl.accessToken = "pk.eyJ1IjoiYXJ0eW9tcGFza2V2aWNoeWFuIiwiYSI6ImNremJvNnRvMDAxZWEybnFncmt1YmpydnkifQ.HU4Qhi34Mu8ohOShn5snHw";

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [37.621667, 54.192105],
	zoom: 12,
	pitch:15
	});
createMarker();

map.on('style.load', function() {
	map.on('click', function(e) {
		trigger = true;
		var lon = document.getElementById("coordinatesLongitude");
		var lat = document.getElementById("coordinatesLatitude");
		longitude = e.lngLat.lng;
		latitude = e.lngLat.lat;
		lon.value = longitude;
		lat.value = latitude;
		marker.setLngLat([longitude, latitude]);
	});
})


function copyData() {

}

function createMarker() {
	var el = document.createElement('div');
	el.className = "pickerPin";
	marker = new mapboxgl.Marker(el)
	   .setLngLat([longitude, latitude])
	   .setOffset([0, -24])
	   .addTo(map);
}

function fillForm() {
	if (trigger) {
		var url = "/addHandle/preloaded/nil/" + longitude + "/" + latitude + "/nil/nil";
	} else {
		var url = "/addHandle";
	}
	
	document.location.replace(url);
}