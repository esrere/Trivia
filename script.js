const categories = [
{
    name: "Nodarbes",
    questions: {
        100: ["Question", "Answer"],
        200: ["Question", "Answer"],
        300: ["Question", "Answer"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
},
{
    name: "Izklaides",
    questions: {
        100: ["Question", "Answer"],
        200: ["Question", "Answer"],
        300: ["Question", "Answer"],
        400: ["Kāds ir man letterboxd top4?", "Handmaiden, City of God, Portrait of a lady on fire, Marty supreme"],
        500: ["Cik zvaigznes man ir DTI? ± 1000", "14836"]
    }
},
{
    name: "Foto",
    questions: {
        100: ["Question", "Answer"],
        200: ["Question", "Answer"],
        300: ["Question", "Answer"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
},
{
    name: "Izcelsme",
    questions: {
        100: ["Question", "Answer"],
        200: ["Question", "Answer"],
        300: ["Cik procenti es esmu ebrejs? ± 5%", "6,25%"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
},
{
    name: "General knowledge",
    questions: {
        100: ["Question", "Answer"],
        200: ["Question", "Answer"],
        300: ["Question", "Answer"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
}
];

const values = [100, 200, 300, 400, 500];
const board = document.getElementById("board");

let scores = [0, 0, 0, 0];
let currentValue = 0;
let currentCell = null;

function updateScores() {
    document.getElementById("team1").textContent = scores[0];
    document.getElementById("team2").textContent = scores[1];
    document.getElementById("team3").textContent = scores[2];
    document.getElementById("team4").textContent = scores[3];
}

categories.forEach(category => {
    const header = document.createElement("div");
    header.className = "category";
    header.textContent = category.name;
    board.appendChild(header);
});

values.forEach(value => {
    categories.forEach(category => {

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = value;

        cell.onclick = () => {

            if (cell.classList.contains("used")) return;

            currentValue = value;
            currentCell = cell;

            document.getElementById("question").textContent =
                category.questions[value][0];

            document.getElementById("answer").textContent =
                "Answer: " + category.questions[value][1];

            document.getElementById("answer").style.display = "none";

            document.getElementById("modal").style.display = "flex";
        };

        board.appendChild(cell);
    });
});

function showAnswer() {
    document.getElementById("answer").style.display = "block";
}

function awardPoints(team) {
    scores[team] += currentValue;
    updateScores();
    finishQuestion();
}

function addPoints(team) {
    scores[team] += 100;
    updateScores();
}

function noWinner() {
    finishQuestion();
}

function finishQuestion() {
    currentCell.classList.add("used");
    currentCell.textContent = "";
    document.getElementById("modal").style.display = "none";

    const remaining = document.querySelectorAll(".cell:not(.used)");

    if (remaining.length === 0) {

        const highest = Math.max(...scores);
        const winner = scores.indexOf(highest) + 1;

        setTimeout(() => {
            alert(
                "Game Over!\n\nWinner: Team " +
                winner +
                "\nScore: " +
                highest
            );
        }, 200);
    }
}
