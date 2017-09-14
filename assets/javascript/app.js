$(document).ready(function() {
function gameOn() {
  fiveSeconds();
	$("#start-game").hide();
  $("#options").show();
  

var timer = 10;
var intervalId;
var userGuess;
var correctAnswer = "testing";

 function fiveSeconds() {
 	run();
 	function run() {
      intervalId = setInterval(decrement, 1000);
    }

function decrement() {
		$("#question").html(questions.Q1.question);
    $("#option-1").html(questions.Q1.a);
    $("#option-2").html(questions.Q1.b);
    $("#option-3").html(questions.Q1.c);
    $("#option-4").html(questions.Q1.d);
 	timer--;

 		$("#timer").html("<h2>" + timer + "</h2>");
 		if (timer === 0) {
      	$("#game-status").empty();
      	$("#game-status").html("<h2>Time's Up!</h2>");
      	clearInterval(intervalId);
      	timer = 10;
      	gameOn();
      	
      } 
        // in the element with an id of time-left add an h2 saying About 10 Seconds Left!
       }
        $("#game-status").html("<h2>About 10 Seconds Left!</h2>");
        // console log 10 seconds left

      }
      
}
$("#options").hide();
$("#start-game").on("click", function() {
   gameOn();


   });

});