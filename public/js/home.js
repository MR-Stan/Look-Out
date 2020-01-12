let map;

let infoWindow;

let marker;

let pos;

// $.post('/location/new', (req, res) => {
//     console.log(res.body);
// });

// fetch('/location/new', (req, res) => {
//     //console.log(req);
//     console.log(res);
// });

// let response = fetch('/location/new');

// if (response.ok) {
//     let json = response.json();
//     console.log(json);
// }   


if (pos === undefined) {
    // if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            initMap();
        });
    }
    // browser does not support geolocation
    else {

    }

}
else {

}

function initMap() {
    // map center and zoom
    map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 11,
        center: pos
    });
    $.ajax({
        type: 'POST',
        url: '/location/current',
        data: pos,
        success: function (data) {
            addMarker(data);
            updateTable(data);
        }
    });
}
// infoWindow = new google.maps.InfoWindow;

// if browser supports geolocation
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//         pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//         };

//         infoWindow.open(map);
//         map.setCenter(pos);

// sending location data to apiRoutes.js
// $.ajax({
//     type: 'POST',
//     url: '/location/current',
//     data: pos,
//     success: function (data) {
//         addMarker(data);
//         updateTable(data);
//     }
// });

//     }, function () {
//         handleLocationError(true, infoWindow, map.getCenter());
//     });
// } else {
//     // browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
// }
// }

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
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//         'Error: The Geolocation service failed.' :
//         'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
// }

//updates table with crime data
function updateTable(data) {
    for (let i = 0; i < data.length; i++) {
        $('#crimeBody').append('<tr/>').append('<td>' + data[i].type + '</td>' + '<td>' + data[i].date + '</td>' + '<td>' + data[i].address + '</td');

    }



}

// open side nav bar
function openNav() {
    $("#mysidenav").css({ "transform": "translateX(0)" });
};

// close side nav bar
function closeNav() {
    $("#mysidenav").css({ "transform": "translateX(-100%)" });
};