// show login modal with google location autocomplete
$(function () {

    let lat = "";

    let lng = "";

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

    $('#locationModal').modal('show');


    $('#changeLocationBtn').click(function (event) {
        event.preventDefault();

        $("<form method='POST' action='/location/current'/>")
            .append("<input type='hidden' name='lat' value=" + lat + " />")
            .append("<input type='hidden' name='lng' value=" + lng + " />")
            .appendTo("body")
            .submit();

    });

});

