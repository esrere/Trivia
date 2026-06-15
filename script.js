const categories = [
{
    name: "Nodarbes",
    questions: {
        100: ["Kuru skolu es nekad neapmeklēju: Mākslas, Mūzikas, Sporta?", "Sporta"],
        200: ["Cik veidu dejas es dejoju bērnībā? Plus punkti par katru ko nosauksiet.", "3"],
        300: ["Question", "Answer"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
},
{
    name: "Izklaides",
    questions: {
        100: ["Vai es labak skrietu 2km avi brauktu ar riteni 20km?", "Brauktu ar riteni 20km"],
        200: ["Question", "Answer"],
        300: ["Question", "Answer"],
        400: ["Kāds ir man letterboxd top4?", "Handmaiden, City of God, Portrait of a Lady on Fire, Marty Supreme"],
        500: ["Cik zvaigznes man ir DTI? ±1000", "14836"]
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
        100: ["Kur es piedzimu? (precīzi)", "Latvija, Rīga, Rīgas dzemdību nams"],
        200: ["Question", "Answer"],
        300: ["Cik procenti es esmu ebrejs? ±5%", "6.25%"],
        400: ["Question", "Answer"],
        500: ["Question", "Answer"]
    }
},
{
    name: "General Knowledge",
    questions: {
        100: ["", ""],
        200: ["Question", "Answer"],
        300: ["Kāds ir mans Duolingo streak? ±100", "1140"],
        400: ["Spotle rounds: https://spotle.io/?artist=RGVmdG9uZXM=&note=VGFrZSBhIHJpc2s=, ja fiksi uzminat (3), +200", "Deftones"],
        500: ["Question", "Answer"]
    }
}
];

const values = [100, 200, 300, 400, 500];
const board = document.getElementById("board");

let scores = [0, 0, 0, 0];
let currentValue = 0;
let currentCell = null;

/* ================= SCORE UPDATE ================= */

function updateScores() {
    document.getElementById("team1").textContent = scores[0];
    document.getElementById("team2").textContent = scores[1];
    document.getElementById("team3").textContent = scores[2];
    document.getElementById("team4").textContent = scores[3];
}

/* ================= + / - BUTTONS ================= */

function changePoints(team, amount) {
    scores[team] += amount;
    updateScores();
}

/* ================= BUILD BOARD ================= */

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

/* ================= MODAL ================= */

function showAnswer() {
    document.getElementById("answer").style.display = "block";
}

function awardPoints(team) {
    scores[team] += currentValue;
    updateScores();
    finishQuestion();
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
                "Game Over!\nWinner: Team " +
                winner +
                "\nScore: " +
                highest
            );
        }, 200);
    }
}
