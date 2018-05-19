// Create an array to hold the names of animals
var animalList = ["Alpaca", "Bird", "Cat", "Dog", "Elephant", "Gorilla", "Hyena", "Iguana", "Jackal", "Kowala", "Lizard", "Monkey", "Octopus", "Penguin", "Rhino", "Snake", "Tiger", "Whale", "Zebra"];

// Grabbing text from the a form on the page to make a new button
$("#animal-submit").on("click", function () {
	// Looks for text in the submit box to create a new button
	var newAnimal = $("#new-animal").val().trim();

	if(newAnimal) {
		// Pushing new buttons onto the animal buttons div
		animalList.push(newAnimal);
		animalButton();
	}

	// Clearing out the submit window
	$("#new-animal").val("");
});

// The function below creates animal buttons in the webpage
function animalButton(){
	// Clear out the DIV prior to adding buttons
	$("#animal-buttons").empty();
	// For loop to go through the animal array and create a button for each item
	for(i=0; i < animalList.length; i++) {
		// Creating a variable to store the button information
		var animalButton = $("<button type='button'>");
		// Adding properties to the button
		animalButton.addClass("animal-btn btn btn-primary");
		animalButton.attr("data-name", animalList[i]);
		animalButton.text(animalList[i]);
		// Appending the button to the webpage
		$("#animal-buttons").append(animalButton);
	}
}



function animalDiaplay () {
	// Creating two variables
	// animalName gets the data attribute which is the name of the animal to use in our search
	// queryURL is what connects us to the GIPHY API to display our GIF
	var animalName = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + " &api_key=SyuOPP6j0xjsqo8zSOULG8Dt7V8Md6tr&limit=10";

	// Ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function (animalGIF) {
		// Empty section before displaying animal GIF
		$("#animal-images").empty();

		for (var j = 0; j < animalGIF.data.length; j++) {
			// Create html elements for each object
			var animalDiv = $("<div>");
			var p = $("<p>");
			var animalImg = $("<img>");

			// Setting attributes for the images which will be appended in the div
			animalImg.addClass("animal-img");
			animalImg.attr("data-state", "still");
			animalImg.attr("data-still", animalGIF.data[j].images.fixed_height_still.url);
			animalImg.attr("data-animate", animalGIF.data[j].images.fixed_height.url);

			// Get the image url and its ratiing
			p.text("Rating : " + animalGIF.data[j].rating);
			animalImg.attr("src", animalGIF.data[j].images.fixed_height_still.url);

			// Append image and its rating
			animalDiv.append(animalImg);
			animalDiv.append(p);
			$("#animal-images").append(animalDiv);
		}
	});
}

// Animating the image when clicking
function animalsInMotion() {

	// Get the attributes of clicked image
	var state = $(this).attr("data-state");
	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");

	//Change url according to the status
	if (state !== 'still') {
		$(this).attr("src", still);
		$(this).attr("data-state", 'still');

	} else {
		$(this).attr("src", animate);
		$(this).attr("data-state", 'animate');
	}

}

// Rendering the aimal buttons on the webpage
animalButton();

// Onclick function to display the animals in the page
$(document).on("click", ".animal-btn", animalDiaplay);


// Onclick function to animate the animals when clicked
$(document).on("click", ".animal-img", animalsInMotion);