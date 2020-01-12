

// show login modal with google location autocomplete
$(function () {
    // hold latitude data
    let lat;
    // hold longitude data
    let lng;
    // after the page loads, when the modal is shown
    $(document).on('shown.bs.modal', '#locationModal', function () {
        // setting input variable for ease of use
        const input = document.getElementById("locationInput");
        // setting options
        const options = { types: ['(cities)'] }
        // setting google autocomplete to variable
        const autocomplete = new google.maps.places.Autocomplete(input, options);
        // event listener, when locationInput is changed update the list
        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            const place = autocomplete.getPlace();
            lat = place.geometry.location.lat();
            lng = place.geometry.location.lng();
        });
    });
    // show change location modal
    $('#locationModal').modal('show');
    // when change location submit button is pressed
    $('#changeLocationBtn').click(function (event) {
        event.preventDefault();
        // http post data
        $("<form method='POST' action='/location/new'/>")
            .append("<input type='hidden' name='lat' value=" + lat + " />")
            .append("<input type='hidden' name='lng' value=" + lng + " />")
            .appendTo("body")
            .submit();
        // store new location in local storage
        sessionStorage.lat = lat;
        sessionStorage.lng = lng;
    });
});

