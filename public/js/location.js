// show login modal with google location autocomplete
$(function () {

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
            // const lat = place.geometry.location.lat();
            // const lng = place.geometry.location.lng();
        });
    });

    $('#locationModal').modal('show');
});

