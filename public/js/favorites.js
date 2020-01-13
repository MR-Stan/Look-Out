
{/* <tr>
    <th scope='row'>
        <div class='custom-control custom-checkbox mb-3'>
            {/* need to add id or name to parse data */}
//             <input type='checkbox' class='custom-control-input'>
//          </div>
//      </th>
// </tr> */}

$(function () {
    $('#favoritesModal').modal({
        show: 'true',
        backdrop: 'static'
    });
});

function displayFavorites() {
    let favorites;
    // get favorites data from server
    $.get('/favorites/all', function (data) {
        favorites = data.split(';');
    }).then(function () {
        // placing favorites data in favorites table
        for (let i = 0; i < favorites.length; i++) {
            $('#tableBody').append('<tr/>').append('<td>' + favorites[i] + '</td>');
        }
    });

}

displayFavorites();