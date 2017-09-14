$(document).ready(function() {
function gameOn() {
	$("#start-game").hide();

var timer = 10;
var intervalId;
var userGuess;
var correctAnswer = "testing";
// var questions = {
//   Q1: {
//    question: "What was the name of Moses' sister?",
//    a: "A. Naamah",
//    b: "B. Phoebe",
//    c: "C. Miriam",
//    d: "D. Jemima",
//    correctAnswer: "C: Miriam"
//   }
// }
setTimeout(fiveSeconds, 1000);

 function fiveSeconds() {
 	run();
 	function run() {
      intervalId = setInterval(decrement, 1000);
    }

function decrement() {
		$("#question").html(questions.Q1.question);
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

$("#start-game").on("click", function() {
   gameOn();

   });

});