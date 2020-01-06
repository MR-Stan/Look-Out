let map;

let infoWindow;

let marker;

// set to user's default location from database
let pos = { lat: -34.397, lng: 150.644 };

function initMap() {
    // map center and zoom
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 14,
        center: pos
    });
    // marker location
    marker = new google.maps.Marker({
        position: pos,
        map: map,
        animation: google.maps.Animation.DROP
    });
    infoWindow = new google.maps.InfoWindow;
    marker.addListener('click', toggleBounce);
    // if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.open(map);
            map.setCenter(pos);
            // updates marker location
            marker.setPosition(pos);

            // sending location data to apiRoutes.js
            $.ajax({
                type: 'POST',
                url: '/current/location',
                data: pos
            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// location error
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// marker bounce animation
function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
