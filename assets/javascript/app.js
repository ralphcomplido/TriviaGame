$(document).ready(function() {
    // music
    var backgroundMusic = new Audio("assets/audio/background-music.mp3");
    var correctSound = new Audio("assets/audio/correct.mp3");
    var wrongSound = new Audio("assets/audio/wrong.mp3");
    var clockSound = new Audio("assets/audio/clock.mp3");
    var timesupSound = new Audio("assets/audio/times-up.mp3");
    var clapSound = new Audio("assets/audio/clap.mp3");
    var cheerSound = new Audio("assets/audio/cheer.mp3");

    // variables for game
    var timer = 10;
    var intervalId;
    var userGuess = 0;
    var currentQuestion;
    var askedQuestions = [];
    var noAnswer = 0;
    var correctAnswers = 0;
    var wrongAnswers = 0;
    // start game
    function gameOn() {
        // continue game til it reach 10 questions
        if (askedQuestions.length < 10) {
            run();
            $("#start-game").hide();
            $("#options").show();
            $("#times-up").hide();
            $("#timer").html("<h2> Time Remaining: " + timer + "</h2>");
            chooseQuestion();
        } else { // game result and restart game
            cheerSound.play();
            clapSound.play();
            $("#restart-game").show();
            $("#game-content").hide();
            $("#times-up").hide();
            $("#timer").hide();
            $("#game-result").html("<h2><p>Game Over</p></h2>");
            $("#game-result").append("<h2><p>Correct Answers: " + correctAnswers + "</p></h2>");
            $("#game-result").append("<h2><p>Wrong Answers: " + wrongAnswers + "</p></h2>");
            $("#game-result").append("<h2><p>Missed Questions: " + noAnswer + "</p></h2>");
        }
    }
    // set interval for timer
    function run() {
        intervalId = setInterval(decrement, 1000);

    };
    // time running
    function decrement() {
        clockSound.play();
        timer--;
        $("#timer").html("<h2> Time Remaining: " + timer + "</h2>");
        // times up
        if (timer === 0) {
            timesupSound.play();
            clockSound.pause();
            noAnswer++;
            timer = 10;
            userGuess = 1;
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<div style='background:#1e90ff; border-radius: 25px; padding:20px;'><h2><p>Time's Up!</p><p>The correct answer is:</p><p>" + questions[currentQuestion].correctAnswer + "</p></h2></div>");
            clearInterval(intervalId);
            delete questions[currentQuestion];
            setTimeout(gameOn, 3000);

        }
    };
    // choose random question
    function chooseQuestion() {

        var randomQuestion = function(obj) {
            var keys = Object.keys(obj);
            currentQuestion = keys[keys.length * Math.random() << 0];

            askedQuestions.push(currentQuestion);

            for (var i = 0; i < askedQuestions.length; i++) {
                $("#options").show();
                $("#question").html(questions[currentQuestion].question);
                $("#option-1").html(questions[currentQuestion].a);
                $("#option-2").html(questions[currentQuestion].b);
                $("#option-3").html(questions[currentQuestion].c);
                $("#option-4").html(questions[currentQuestion].d);

            }
        };
        randomQuestion(questions);

    };
    // choose answer

    $(".choose").click(function() {

        var answer = this.innerHTML;
        // if answer is correct
        if (answer === questions[currentQuestion].correctAnswer) {
            correctSound.play();
            clockSound.pause();
            correctAnswers++;
            timer = 10;
            console.log("good");
            clearInterval(intervalId);
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<div style='background:#00FF00; border-radius: 25px; padding: 35px;'><h2><p>Your answer is correct!</p><p> " + questions[currentQuestion].correctAnswer + "</p></h2></div>");
            clearInterval(intervalId);
            setTimeout(gameOn, 3000);
            userGuess = 0;
            delete questions[currentQuestion];


        } else { // if answer is wrong
            wrongSound.play();
            clockSound.pause();
            wrongAnswers++;
            timer = 10;
            clearInterval(intervalId);
            console.log("not good");
            $("#options").hide();
            $("#times-up").show();
            $("#times-up").html("<div style='background:#ff4500; border-radius: 25px; padding: 20px;'><h2><p>Your answer is wrong!</p><p>The Correct answer is :</p><p>" + questions[currentQuestion].correctAnswer + "<p/></h2></div>");
            clearInterval(intervalId);
            setTimeout(gameOn, 3000);
            userGuess = 0;
            delete questions[currentQuestion];
        }

    });

    $("#options").hide();
    $("#times-up").hide();
    $("#restart-game").hide();
    backgroundMusic.play();

    // start game button
    $("#start-game").on("click", function() {
        $("#game").hide();

        gameOn();


    });
    // restart game button
    $("#restart-game").on("click", function() {
        window.location.reload();


    });
});