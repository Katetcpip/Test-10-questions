const questions = [{
        question: "How many members are in BTS ?",
        optionA: "10 ",
        optionB: "14 ",
        optionC: "5 ",
        optionD: "7 ",
        correctOption: "optionD"
    },

    {
        question: "How many packs of ramen did Jeongkook eat at one time?",
        optionA: "74 ",
        optionB: "6 ",
        optionC: "1 ",
        optionD: "12 ",
        correctOption: "optionB"
    },

    {
        question: "Who is the leader of BTS?",
        optionA: "Jeon JungKook",
        optionB: "Barack Obama",
        optionC: "Abraham Lincoln",
        optionD: "Kim Namjoon",
        correctOption: "optionD"
    },

    {
        question: "174sm is ______ height",
        optionA: "Jin",
        optionB: "Suga",
        optionC: "Jimin",
        optionD: "Hoseok",
        correctOption: "optionC"
    },

    {
        question: "What is the year of BTS foundation?",
        optionA: "2007",
        optionB: "2022",
        optionC: "2018",
        optionD: "2013",
        correctOption: "optionD"
    },

    {
        question: "Who is the oldest member?",
        optionA: "Min Yoongi",
        optionB: "Barak Obama",
        optionC: "Kim Seokjin",
        optionD: "Larisa Guzeeva",
        correctOption: "optionA"
    },

    {
        question: "_____ is the national korean food?",
        optionA: "Borsch",
        optionB: "Water",
        optionC: "Kimchi",
        optionD: "Olivier salad",
        correctOption: "optionC"
    },

    {
        question: "Which city is the capital of the South Korea?",
        optionA: "Seoul",
        optionB: "Moscow",
        optionC: "Asan",
        optionD: "Nonsan",
        correctOption: "optionA"
    },

    {
        question: "Who was the 1st to join the army ?",
        optionA: "Barak Obama",
        optionB: "Hoseok",
        optionC: "Jimin",
        optionD: "Jin",
        correctOption: "optionD"
    },

    {

        question: "What is the alternative of vodka in Korea",
        optionA: "Eminem",
        optionB: "Vodka",
        optionC: "Gleg",
        optionD: "Soju",
        correctOption: "optionD"

    }
]

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0 //for next question

function NextQuestion(i) {
    const currentQuestion = questions[i]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}

function checkForAnswer() {
    const currentQuestion = questions[indexNumber] //current question 
    const currentQuestionAnswer = currentQuestion.correctOption //answer
    const options = document.getElementsByName("option"); //all el with radio input
    let correctOption

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //warning - choose any answer to continue
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //+ and - for statistic
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            playerScore++
            indexNumber++
            questionNumber++

        } else if (option.checked && option.value !== currentQuestionAnswer) {
            wrongAttempt++
            indexNumber++
            questionNumber++
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    if (indexNumber <= 9) {
        NextQuestion(indexNumber)
    } else {
        endGame()
    }
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function endGame() {
    let remark;
    let remarkColor;

    if (playerScore <= 3) {
        remark = "BTS are sad."
        remarkColor = "red"
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "You can do better for BTS."
        remarkColor = "orange"
    } else if (playerScore >= 7) {
        remark = "Excellent, BTS arre happy!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}