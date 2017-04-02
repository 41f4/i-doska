let map;
let markers = [];

function makeMarker(point, title) {
        return new google.maps.Marker({
          map: map,
          position: point,
          title: title
        });
}

function initMap(options) {
    options = options || {
            zoom: 13,
            center: {
                lat: 56.328938,
                lng: 43.962387
            }
        };
    let mapElement = document.getElementById('map-container');
    map = new google.maps.Map(mapElement, options);
    for (let i in desks) {
        markers.push(makeMarker(desks[i].point, desks[i].title));
    }
}

function errorCallback(err) {
    console.warn(`Error getting current postion: ${err.code} - ${err.message}`);
    initMap();
}

function successCallback(pos) {
    initMap({
        center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        },
        zoom: 8
    });
}

function onGoogleMapsReady() {
    if (navigator.geolocation) {
        let geoOptions = {
            maximumAge: 15000,
            timeout: 2,
            enableHighAccuracy: true

        };
        try {
            navigator.geolocation.getCurrentPosition(
                successCallback, errorCallback, geoOptions);
        }
        catch(e) {
            errorCallback({code: 'N/A', message: e.message})
        }
    } else {
        errorCallback({code: 'N/A', message: "Browser doesn't support Geolocation"})
    }
}

