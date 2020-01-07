// opens location modal on page load and prevents unwanted closure
$(function () {
    $('#locationModal').modal({
        show: 'true',
        //backdrop: 'static', // prevents closing by clicking out of modal
    });
});



// function newLocation (address) {
//     return new Promise(function (resolve, reject) {
//         geocoder.geocode({ 'address': address }, function (results, status) {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 resolve(results);
//             } else {
//                 reject(Error("Geocode for address " + address + " was not successful for the following reason: " + status));
//             }
//         });
//     });
// }