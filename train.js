 // Your web app's Firebase configuration
 var firebaseConfig = {
     apiKey: "AIzaSyByNEozd8w1LihHe0vjBrtWc3NwxcCC-cI",
     authDomain: "train-schedule-c547f.firebaseapp.com",
     databaseURL: "https://train-schedule-c547f.firebaseio.com",
     projectId: "train-schedule-c547f",
     storageBucket: "train-schedule-c547f.appspot.com",
     messagingSenderId: "123784825277",
     appId: "1:123784825277:web:4d3be48ec1612d267a2ad4"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 $("#add-train-btn").on("click", function(event) {
             event.preventDefault();

             // Grabs user input
             var name = $("#train-name").val().trim();
             var place = $("#train-destination").val().trim();
             var startTime = $("#first-train-time").val().trim();
             var frequency = $("#train-frequency").val().trim();

             // Creates local "temporary" object for holding train data
             var newTrain = {
                 name: name,
                 destination: place,
                 firstTrainTime: startTime,
                 trainFrequency: frequency
             };



             database.ref().push(newTrain);

             console.log(newTrain.name);
             console.log(newTrain.destination);
             console.log(newTrain.firstTrainTime);
             console.log(newTrain.trainFrequency);