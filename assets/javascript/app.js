$(document).ready(function() {

    var timer = 10;
    var intervalId;
    var userGuess = 0;


    function gameOn() {
        run();
        $("#start-game").hide();
        $("#options").show();
        $("#times-up").hide();
    }

    function run() {
        intervalId = setInterval(decrement, 1000);
        timer = 10;
    }

    function decrement() {
        timer--;
        chooseQuestion();

        function chooseQuestion() {
            for (var key in questions) {
                if (userGuess === 0) {
                    $("#timer").html("<h2> Time Remaining: " + timer + "</h2>");
                    $("#options").show();
                    $("#question").html(questions[key].question);
                    $("#option-1").html(questions[key].a);
                    $("#option-2").html(questions[key].b);
                    $("#option-3").html(questions[key].c);
                    $("#option-4").html(questions[key].d);
                    newQuestion();

                    $(".choose").click(function() {
                        userGuess = 1;
                        var answer = this.innerHTML;
                        if (answer === questions[key].correctAnswer) {
                            clearInterval(intervalId);
                            $("#times-up").show();
                            $("#times-up").html("<h2>Your answer is correct! " + questions[key].correctAnswer + "</h2>");
                            setTimeout(gameOn, 3000);
                            userGuess = 0;
                        } else {
                            clearInterval(intervalId);
                            $("#times-up").show();
                            $("#times-up").html("<h2>Your answer is wrong! The Correct answer is : " + questions[key].correctAnswer + "</h2>");
                            setTimeout(gameOn, 3000);
                            userGuess = 0;
                        }
                    });

                }
            };


        }

    }


    function newQuestion() {
        if (timer === 0) {
            userGuess = 0;
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<h2>Time's Up!</h2>");
            clearInterval(intervalId);
            $("#start-game").show();
        }
    }




    $("#options").hide();
    $("#start-game").on("click", function() {
        gameOn();


    });
});