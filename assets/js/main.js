"use strict"

$(() => {

    class TriviaGame {
        startBtn = $("#startBtn");
        startSection = $("#startSection");
        questionSection = $("#questionSection");
        currentQuestion = "";
        timer = 30;
        right = 0;
        wrong = 0;
        unanswered = 0;
        count = 0;
        timeInterval = '';
        questions = [
            {
                question: "What was the first full length CGI movie?",
                answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
                correctAnswer: "Toy Story",
                image: "./assets/img/toystory.gif"
            },
            {
                question: "Which of these is NOT a name of one of the Spice Girls?",
                answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
                correctAnswer: "Fred Spice",
                image: "./assets/img/spicegirls.gif"
            },
            {
                question: "Which NBA team won the most titles in the 90s?",
                answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
                correctAnswer: "Chicago Bulls",
                image: "./assets/img/bulls.gif"
            },
            {
                question: "Which group released the hit song, 'Smells Like Teen Spirit'?",
                answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
                correctAnswer: "Nirvana",
                image: "./assets/img/nirvanabark.gif"
            },
            {
                question: "Which popular Disney movie featured the song, \"Circle of Life\"?",
                answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
                correctAnswer: "The Lion King",
                image: "./assets/img/lionking.gif"
            },
            {
                question: "Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near, the license plate said...\"",
                answers: ["Dice", "Mirror", "Fresh", "Cab"],
                correctAnswer: "Fresh",
                image: "./assets/img/fresh.gif"
            },
            {
                question: "What was Doug's best friend's name?",
                answers: ["Skeeter", "Mark", "Zach", "Cody"],
                correctAnswer: "Skeeter",
                image: "./assets/img/skeeter.gif"
            },
            {
                question: "What was the name of the principal at Bayside High in Saved By The Bell?",
                answers: ["Mr.Zhou", "Mr.Driggers", "Mr.Belding", "Mr.Page"],
                correctAnswer: "Mr.Belding",
                image: "./assets/img/belding.gif"
            }
        ];

        showPanel() {
            this.startBtn.on("click", () => {
                this.startSection.css({ display: "none" });
                this.questionSection.css({ display: "block" });
                this.startGame();
            })

        }

        startGame() {
            this.timeInterval = setInterval(() => {
                $("#timer").html(this.timer)
                this.timer--;
                if (this.timer < 0) {
                    clearInterval(this.timeInterval);
                    setTimeout(() => {
                        this.timeOut();
                    }, 1000);
                }
            }, 1000);

            if (this.count < this.questions.length) {
                $("#questionSection").html(
                    `<h4 class="mb-4">Time Remaining: <span id="timer">30</span> Seconds</h4>
                    <p class="mb-3" id="questionText"></p>
                    <ul></ul>`);

                $("#questionText").html(this.questions[this.count].question);
                this.currentQuestion = this.questions[this.count];

                this.count = this.count + 1;
                for (let j = 0; j < this.currentQuestion.answers.length; j++) {
                    var variant = $("<li>").html(this.currentQuestion.answers[j]).addClass("variant");
                    $("ul").append(variant);
                }
            } else {
                clearInterval(this.timeInterval);
                $("#questionSection").html(
                    `<h4 class="mb-3">Time Remaining: <span id="timer">${this.timer}</span> Seconds</h4>
                    <h3>All done, heres how you did!</h3>
                    <p class="mt-2">Correct Answers: <span>${this.right}</span></p>
                    <p class="mt-2">Incorrect Answers: <span>${this.wrong}</span></p>
                    <p class="mt-2">Unanswered: <span>${this.unanswered}</span></p>
                    <button class="mt-3 btn-secondary" onClick="window.location.reload();">Start Over?</button>
                    `
                )

            }
        }

        rightAnswer() {
            this.right++;
            clearInterval(this.timeInterval);
            $("#questionSection").html(
                `<h4 class="mb-3">Time Remaining: <span id="timer">${this.timer}</span> Seconds</h4>
                <h3>Correct!</h3>
                <img class="mt-3" src="${this.currentQuestion.image}" width="300" alt="">`
            )

            setTimeout(() => {
                this.timer = 30;
                this.startGame();
            }, 3000);
        }

        wrongAnswer() {
            this.wrong++;
            clearInterval(this.timeInterval)
            $("#questionSection").html(
                `<h4 class="mb-3">Time Remaining: <span id="timer">${this.timer}</span> Seconds</h4>
                <h3>Nope!</h3>
                <p class="mt-2">The Correct Answer was: <span>${this.currentQuestion.correctAnswer}</span></p>
                <img class="mt-3" src="${this.currentQuestion.image}" width="300" alt="">`
            )
            setTimeout(() => {
                this.timer = 30;
                this.startGame();
            }, 3000);
        }

        timeOut() {
            this.unanswered++;
            $("#questionSection").html(
                `<h4 class="mb-3">Time Remaining: <span id="timer">0</span> Seconds</h4>
                <h3>Out of Time!</h3>
                <p class="mt-2">The Correct Answer was: <span>${this.currentQuestion.correctAnswer}</span></p>
                <img class="mt-3" src="${this.currentQuestion.image}" width="300" alt="">`
            )
            setTimeout(() => {
                this.timer = 30;
                this.startGame();
            }, 3000);
        }
    }

    var triviaGame = new TriviaGame();

    triviaGame.showPanel();

    $(document).on("click", ".variant", function () {
        if (triviaGame.timer > 0) {
            if ($(this).html() == triviaGame.currentQuestion.correctAnswer) {
                triviaGame.rightAnswer();
            } else {
                triviaGame.wrongAnswer();
            }
        }
    })

})
