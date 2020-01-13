let map;

let infoWindow;

let marker;

let pos = {
    lat: parseFloat(sessionStorage.lat),
    lng: parseFloat(sessionStorage.lng)
}

// if session storage is empty will return NaN
if (isNaN(pos.lat)) {
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
        console.log('Browser does not support geolocation');
    }
}
// if session storage has location then
else {
    initMap();
}

// initialize map
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
        },
        error: function (error) {
            console.log(error);
        }
    });
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