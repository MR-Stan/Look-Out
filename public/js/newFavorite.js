$(function () {
    $('#newFavoriteModal').modal({
        show: 'true'
    })
});

let lat;

let lng;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;
    lat = crd.latitude;
    lng = crd.longitude;
}

function error(err) {
    console.log(err);
}

navigator.geolocation.getCurrentPosition(success, error, options);

$('#addFavoriteBtn').click(function (event) {
    event.preventDefault();

    $("<form method='POST' action='/favorites/add'/>")
        .append("<input type='hidden' name='lat' value=" + lat + " />")
        .append("<input type='hidden' name='lng' value=" + lng + " />")
        .appendTo("body")
        .submit();

});