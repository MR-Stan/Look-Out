// login modal - google location autocomplete
$(function () {
    $("#locationModal").modal({
        show: false
    }).on("shown", function () {
        const input = document.getElementById("locationInput");
        const autocomplete = new google.maps.places.Autocomplete(input);
        // google.maps.event.addListener(autocomplete, 'place_changed', function () {
        // });
        autocomplete.addListener('place_changed', function () {
            const place = autocomplete.getPlace();
        });
    });
    $('#locationModal').modal('show');

});

