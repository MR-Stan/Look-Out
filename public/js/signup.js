// opens signup modal on page load and prevents unwanted closure
$(function () {
    $('#signUpModal').modal({
        show: 'true',
        backdrop: 'static' // prevents closing by clicking out of modal
    });
});