function switchPasswordVisibility() {
  var el = document.getElementById("passwordToggle");
  console.log('1')
  if (el.type == "password") {
    console.log("2")
    el.type = "text"
  } else if (el.type == "text") {
    el.type = "password"
  }
}

function submitData() {
  var send = true;
  var id = document.getElementById("identificator");
  if (id.value == "") {
    id.classList.add("mistake");
    send = false;
  }
  var ssid = document.getElementById("ssid");
  if (ssid.value == "") {
    ssid.classList.add("mistake");
    send = false;
  }
  var pwd = document.getElementById("passwordToggle");
  if (pwd.value == "") {
    var el = document.getElementById("passwordField");
    el.classList.add("mistake");
    send = false;
  }
  var lat = document.getElementById("lat");
  if (lat.value == "") {
    lat.classList.add("mistake");
    send = false;
  }
  var lon = document.getElementById("lon");
  if (lon.value == "") {
    lon.classList.add("mistake");
    send = false;
  }

  if (send) {
    var url = "/addDevice?id=" + id.value + "&ssid=" + ssid.value + "&pwd=" + pwd.value + "&lon=" + lon.value + "&lat=" + lat.value; 

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

    var xhr = new XHR();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type",  "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Access-Control-Allow-Origin", url);

    xhr.onload = () => {
      if (xhr.status == 403) {
        callErrorOnClone()
      }
    }

    xhr.send("");
    // document.location.replace("/addHandle");
  }
}


function callErrorOnClone() {
  var el_text = document.getElementById('errorMessage__text');
  el_text.innerHTML = "Устройство с таким ID уже зарегестрированно";

  var el_msg = document.getElementById('errorMessage');
  el_msg.style.right = "20px";
}

function rollBack() {
  var el_msg = document.getElementById('errorMessage');
  el_msg.style.right = "-400px";

  setTimeout(function() {
    var el_text = document.getElementById('errorMessage__text');
    el_text.innerHTML = "";
  }, 500)
  
}

