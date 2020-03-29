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
        }