// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyAihPc1s4_qM3BvyPo99EGOKXLoJpfhW2I",
    authDomain: "click-counter-harcam-ccc3a.firebaseapp.com",
    databaseURL: "https://click-counter-harcam-ccc3a.firebaseio.com",
    projectId: "click-counter-harcam-ccc3a",
    storageBucket: "click-counter-harcam-ccc3a.appspot.com",
    messagingSenderId: "244838916859"
};
firebase.initializeApp(config);

var database = firebase.database();


$(document).ready(function () {
    // access firebase
    $("#save").on("click", function (e) {
        e.preventDefault();
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var frequency = $("#frequency").val().trim();

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        });
    });
    database.ref().on("child_added", function (snapshot) {
        var data = snapshot.val();
        if (!data) {
            return;
        }
        var firstTimeConverted = moment(data.firstTrain, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % data.frequency;
        var minutesAway = data.frequency - tRemainder;
        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
        var html = `
                <tr>
                    <td>${data.trainName}</td>
                    <td>${data.destination}</td>
                    <td>${data.frequency}</td>
                    <td>${nextArrival}</td>
                    <td>${minutesAway}</td>
                </tr>
        `
        $("#trainSection").append(html);
    })
})