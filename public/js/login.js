// login button event handler
$("#logInBtn").on("click", function () {
    // userInfo variable is formatting the input to match the get in apiRoutes.js
    const userInfo = $("#username").text().trim() +
        '/' +
        $("#password").text().trim();

    $.ajax({
        url: "/api/login/" + userInfo,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
});