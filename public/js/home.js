let map;

let infoWindow;

let marker;

// set to user's default location from database
let pos = { lat: -34.397, lng: 150.644 };

function initMap() {
    // map center and zoom
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 11,
        center: pos
    });
    infoWindow = new google.maps.InfoWindow;

    // if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.open(map);
            map.setCenter(pos);

            // sending location data to apiRoutes.js
            $.ajax({
                type: 'POST',
                url: '/location/current',
                data: pos,
                success: function (data) {
                    addMarker(data);
                    updateTable(data);
                }
            });

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

// adds crime markers
function addMarker(data) {
    for (let i = 0; i < data.length; i++) {
        marker = new google.maps.Marker({
            position: {
                lat: parseFloat(data[i].lat),
                lng: parseFloat(data[i].lon)
            },
            map: map,
            title: data[i].type
        });
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

//updates table with crime data
function updateTable(data) {
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
    }
}
