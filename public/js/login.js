$(document).ready(function () {
    console.log("ready");
    // login button event handler
    $("#logInBtn").click(function () {
        event.preventDefault();
        console.log("success");
        // userInfo variable is formatting the input to match the get in apiRoutes.js
        const userInfo = $("#username").text().trim() +
            '/' +
            $("#password").text().trim();
        console.log(userInfo);

        // $.ajax({
        //     url: "/api/login/" + userInfo,
        //     method: "POST"
        // }).then(function (response) {
        //     console.log(response);
        // });
    });
});
