// run on page load
$(function () {
    // holds latitude from server
    let lat;
    // holds longitude from server
    let lng;
    // display favorites modal
    $('#favoritesModal').modal({
        show: 'true',
        backdrop: 'static'
    });
    // populate favorites modal
    function displayFavorites() {
        let favorites;
        // get favorites data from server
        $.get('/favorites/all', function (data) {
            favorites = data.split(';');
        }).then(function () {
            // placing favorites data in favorites table
            for (let i = 0; i < favorites.length; i++) {
                let checkbox = '<input type="radio" name="favorite" + i + value="favorite" + i>'
                console.log(checkbox);
                $('#tableBody').append('<tr/>').append('<td>' + checkbox + ' ' + favorites[i] + '</td>');
            }
        });
    }
    // call function to ppopulate favorites modal
    displayFavorites();
    // submit button onclick
    $('#loadFavorite').click(function (event) {
        event.preventDefault();
        //     // $("<form method='POST' action='/location/new'/>")
        //     $("<form method='POST' action='/'/>")
        //         .append("<input type='hidden' name='lat' value=" + lat + " />")
        //         .append("<input type='hidden' name='lng' value=" + lng + " />")
        //         .appendTo("body")
        //         .submit();
        // store new location in local storage
        // sessionStorage.lat = lat;
        // sessionStorage.lng = lng;
    });
});