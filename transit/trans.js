
var lat = -99999;
var lng = -99999;

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        });
    }
    else {
        alert("Sorry, geolocation is not supported by your web browser.  -MGMT");
    }
    initMap();
}

function initMap() {
    
}