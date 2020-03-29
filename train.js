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

     //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
     database.ref().on("child_added", function(childSnapshot, prevChildKey) {

         console.log(childSnapshot.val());
         // console.log(prevChildKey);

         // Store everything into a variable.
         var trainName = childSnapshot.val().name;
         var destination = childSnapshot.val().destination;
         var firstTrainTime = childSnapshot.val().firstTrainTime;
         var trainFrequency = childSnapshot.val().trainFrequency;

         console.log(firstTrainTime);

         var convertedDate = moment(firstTrainTime, "hh:mm");
         console.log("Converted Time: " + convertedDate + " Type of: " + typeof convertedDate);

         // var newMinutes = moment().diff(moment.unix(firstTrainTime, "X"), "minutes");
         var newMinutes = moment(convertedDate).minutes();
         console.log("Minutes: " + newMinutes + " Type of: " + typeof newMinutes);

         // First Time (pushed back 1 year to make sure it comes before current time)
         var firstTimeConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");
         console.log("Updated Time: " + firstTimeConverted + " Type of: " + typeof firstTrainTime);


         // Difference between the times
         var diffTime = moment().diff(moment(firstTimeConverted), "m");
         console.log("DIFFERENCE IN TIME: " + diffTime + " Type of Difference " + typeof diffTime);

         // Time apart (remainder)
         var tRemainder = diffTime % trainFrequency;
         console.log(tRemainder);

         // Minute Until Train
         var minutes = trainFrequency - tRemainder;
         console.log("MINUTES TILL TRAIN: " + minutes);

         // Next Train
         // .format("LT")
         var nextTrain = moment().add(minutes, "m").format("hh:mm ");
         console.log("ARRIVAL TIME: " + moment().format("hh:mm"));


         // Add each train's data into the table
         $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td><td>");

     });
 })