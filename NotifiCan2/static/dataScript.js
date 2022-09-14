loadMap();
handler();
var map;


function loadMap(longitude=37.604455730791386, latitude=54.1808240271979) {
	var token = "{{ mapbox_access_token }}";
	console.log(token);
	mapboxgl.accessToken = "pk.eyJ1IjoiYXJ0eW9tcGFza2V2aWNoeWFuIiwiYSI6ImNremJvNnRvMDAxZWEybnFncmt1YmpydnkifQ.HU4Qhi34Mu8ohOShn5snHw";
	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [longitude,latitude],
		zoom: 12,
		pitch:15
		});

}


function addMarker(id, longitude=77.3852, latitude=28.5066, fill=100) {
	const el = document.createElement('div');
	el.classList.add("mapContainer__marker");
	if (fill >= 0 && fill <= 30) {
		el.classList.add("mapContainer__marker_green");
		console.log("g");
	} else if (fill > 30 && fill <= 70) {
		el.classList.add("mapContainer__marker_yellow");
		console.log("y");
	} else if (fill > 70 && fill <= 100) {
		el.classList.add("mapContainer__marker_red");
		console.log("r");
	}


	const popup = new mapboxgl.Popup( {
		offset: 25,
		closeButton: false
	} )
		.setHTML(createPopupHTML(id, fill));
	

	new mapboxgl.Marker(el)
	   .setLngLat([longitude, latitude])
	   .addTo(map)
	   .setPopup(popup);
}

function handler() {
    var url = "/getCansArray";
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.setRequestHeader("Authorization", "1235234jgdlr3452341slfej");
    xhr.responseType = 'json';
    
    xhr.onload = () => {
    	if (xhr.status == 200) {  
	    	var lst = xhr.response["cans"];;
	    	for (var i = 0; i < lst.length; i++) {
	    		var data = lst[i]["can"];		
	    		var id = data["id"];
	    		var lon = parseFloat(data["lon"]);
	        	var lat = parseFloat(data["lat"]);
	        	var fill = parseInt(data["fill"]);
	        	addMarker(id, longitude=lon,latitude=lat, fill=fill);
	        }
    	} else {
    		console.log(xhr.status);
    	}
    }

    xhr.send(null);
}

function createPopupHTML(id, value) {
	var popupHTMLbase = ` 
			<div class="popup">
				<div class="popup_caption">
					${id}
				</div>
			    <div class="popup_label">
			    	${value} %
			    </div>
			    <div style="height: 10px;"></div>
			    <button onclick="presentModal(${id}, ${value})" class="popup_button">
			        Дополнительно
			    </button>
			</div>

		`
	return popupHTMLbase
}

function fetchCanInfo(id) {
	var url = `/getCanById?id=${id}`;
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url);

	xhr.setRequestHeader("Authorization", "1235234jgdlr3452341slfej");
	xhr.responseType = 'json';

	xhr.onload = () => {
		if (xhr.status == 200) {
			var can = xhr.response;
			console.log(can);

			return popupHTMLbase;
		}
	}

	xhr.send(null);
}


function presentModal(id, fill) {
	var modal = document.getElementById("modal");
	var overlay = document.getElementById("overlay");

	modal.classList.add("active");
	overlay.classList.add("active");
	overlay.style.display = "block";

	var url = `/getCanById?id=${id}`;
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url);

	xhr.setRequestHeader("Authorization", "1235234jgdlr3452341slfej");
	xhr.responseType = 'json';

	xhr.onload = () => {
		if (xhr.status == 200) {
			var can = xhr.response["can"];
			console.log(can);

			document.getElementById("identificator").value = can["id"];
			document.getElementById("ssid").value = can["wifiName"];
			document.getElementById("passwordToggle").value = can["wifiPassword"];
			document.getElementById("lat").value = can["lat"];
			document.getElementById("lon").value = can["lon"];
			document.getElementById("value").innerHTML = can.lastValue + " %";
		}
	}

	xhr.send(null);
}

function modalRelease() {
	var modal = document.getElementById("modal");
	var overlay = document.getElementById("overlay");

	modal.classList.remove("active");
	overlay.classList.remove("active");
	overlay.style.display = "none";
}
