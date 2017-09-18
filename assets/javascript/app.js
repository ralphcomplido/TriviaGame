$(document).ready(function() {

    var timer = 10;
    var intervalId;
    var userGuess = 0;
    var currentQuestion;
    var askedQuestions = [];
    var noAnswer = 0;
    var correctAnswers = 0;
    var wrongAnswers = 0;

    function gameOn() {
        console.log(askedQuestions.length);
        if (askedQuestions.length < 10) {
            run();
            $("#start-game").hide();
            $("#options").show();
            $("#times-up").hide();
            $("#timer").html("<h2> Time Remaining: " + timer + "</h2>");
            chooseQuestion();
        } else {
            $("#game").hide();
            $("#game-result").html("<h2><p>Game Over</p></h2>");
            $("#game-result").append("<h2><p>Correct Answers: " + correctAnswers + "</p></h2>");
            $("#game-result").append("<h2><p>Wrong Answers: " + wrongAnswers + "</p></h2>");
            $("#game-result").append("<h2><p>Missed Questions: " + noAnswer + "</p></h2>");
        }
    }

    function run() {
        intervalId = setInterval(decrement, 1000);

    };

    function decrement() {
        timer--;
        $("#timer").html("<h2> Time Remaining: " + timer + "</h2>");

        if (timer === 0) {
            noAnswer++;
            timer = 10;
            userGuess = 1;
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<h2><p>Time's Up!</p><p>The correct answer is: " + questions[currentQuestion].correctAnswer + "</p></h2>");
            clearInterval(intervalId);
            delete questions[currentQuestion];
            setTimeout(gameOn, 3000);

        }
    };

    function chooseQuestion() {

        var randomQuestion = function(obj) {
            var keys = Object.keys(obj);
            currentQuestion = keys[keys.length * Math.random() << 0];

            askedQuestions.push(currentQuestion);
            // console.log(keys);
            // console.log(keys[keys.length * Math.random() << 0])
            // delete questions[currentQuestion];
            // console.log(questions[currentQuestion]);
            for (var i = 0; i < askedQuestions.length; i++) {
                $("#options").show();
                $("#question").html(questions[currentQuestion].question);
                $("#option-1").html(questions[currentQuestion].a);
                $("#option-2").html(questions[currentQuestion].b);
                $("#option-3").html(questions[currentQuestion].c);
                $("#option-4").html(questions[currentQuestion].d);
                // console.log(currentQuestion);
                // console.log(askedQuestions);
                //  console.log("match") }    

            }
        };
        randomQuestion(questions);
        console.log(questions);

    };

    $(".choose").click(function() {

        var answer = this.innerHTML;
        if (answer === questions[currentQuestion].correctAnswer) {
            correctAnswers++;
            timer = 10;
            console.log("good");
            clearInterval(intervalId);
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<h2>Your answer is correct! " + questions[currentQuestion].correctAnswer + "</h2>");
            clearInterval(intervalId);
            setTimeout(gameOn, 3000);
            userGuess = 0;
            delete questions[currentQuestion];


        } else {
            wrongAnswers++;
            timer = 10;
            clearInterval(intervalId);
            console.log("not good");
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<h2>Your answer is wrong! The Correct answer is : " + questions[currentQuestion].correctAnswer + "</h2>");
            clearInterval(intervalId);
            setTimeout(gameOn, 3000);
            userGuess = 0;
            delete questions[currentQuestion];
        }

    });

    $("#options").hide();
    $("#start-game").on("click", function() {
        gameOn();


    });
});