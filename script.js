const categories = [
{
    name: "Nodarbes",
    questions: {
        100: ["Kuru skolu es nekad neapmeklēju: Mākslas, Mūzikas, Sporta?", "Sporta"],
        200: ["Kura līmeņa kursu es pabeidzu Goethe šogad?", "B1.2"],
        300: ["Kāds ir mans vasaras darbs, kur un kā sauc iestādi?", "Viesmīle, Baldonē, Mežvidu krodziņš"],
        400: ["Cik veidu un kādas dejas es dejoju bērnībā?", "3, Tautasdejas, Balets, Mūsdienu dejas"],
        500: ["Kā sākas katra mana zīmēšanas nodarbība?", "Uzvelku čībiņas un tad rokas trenniņš"]
    }
},
{
    name: "Funzys",
    questions: {
        100: ["Vai es labāk skrietu 2km vai brauktu ar riteni 20km?", "Brauktu ar riteni 20km"],
        200: ["Kurš GossipGirl tēls es esmu? (Blastīts uz uquiz un arealme quiziem)", "Chuck, blair"],
        300: ["Filma kurai es ieliku 5 zvaigznes letterboxd: HE'S DYING TO BECOME A CHEF", "Ratatouille"],
        400: ["Kāds ir mans Letterboxd top 4?", "The Handmaiden, City of God, Portrait of a Lady on Fire, Marty Supreme"],
        500: ["Spotle: https://spotle.io/?artist=RGVmdG9uZXM=&note=VGFrZSBhIHJpc2s= (+200, ja atminēsi uzreiz)", "Deftones"]
    }
},
{
    name: "Foto",
    questions: {
        100: ["Kas ir meitene blakus man un kā viņu sauc?", "Vāciete, Emma", "Miemma.JPG"],
        200: ["Kas šis ir bija par koncertu? (+ punkti, ja nosauksiet dziesmu)", "Tante Gaida, Klusumā apsēsties", null, "Tantegaida.mp4"],
        300: ["Cik gadi man ir šajā bildē?", "10", "Bul.JPG"],
        400: ["Kādas sekas bija šim incidentam?", "Mākslasskolā brīvie skapīši turpmāk tika aizslēgti", null, "Kruzite.mp4"],
        500: ["Atrodiet mani šajā bildē!", "", "bernudarzs.JPG"]
    }
},
{
    name: "Izcelsme",
    questions: {
        100: ["Kur es piedzimu (precīzi)?", "Latvija, Rīga, Rīgas dzemdību nams"],
        200: ["Cik man bija gadu, kad piedzima mans brālis?", "1"],
        300: ["Cik procenti es esmu ebrejs? ±5%", "6.25%"],
        400: ["Kā mani vecāki izvēlējās manu vārdu?", "Uzrakstīja vairākus vārdus uz lapiņas un salīdzināja"],
        500: ["Kur mani vecāki devās ceļojumā, kamēr mana mamma bija stāvoklī? (Es principā tur arī biju)", "Uz Meksiku"]
    }
},
{
    name: "General Knowledge",
    questions: {
        100: ["Kā sauc manu kaķi?", "Oris (Oreons, Oreo)", "oris.JPG"],
        200: ["Kāds ir mans Duolingo streak? ±100", "1140"],
        300: ["Kuras ķermeņa daļas kaulu es esmu salauzusi?", "Nevienas"],
        400: ["Kāda ir mana mīļākā kārumiņa garša?", "Šokolādes"],
        500: ["Kā es pazīstu katru cilvēku šeit?", "..."]
    }
}
];

const values = [100, 200, 300, 400, 500];
const board = document.getElementById("board");

let scores = [0, 0, 0, 0];
let currentValue = 0;
let currentCell = null;

/* ================= SCORE ================= */

function updateScores() {
    document.getElementById("team1").textContent = scores[0];
    document.getElementById("team2").textContent = scores[1];
    document.getElementById("team3").textContent = scores[2];
    document.getElementById("team4").textContent = scores[3];
}

/* ================= + / - ================= */

function changePoints(team, amount) {
    scores[team] += amount;
    updateScores();
}

/* ================= BOARD ================= */

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

            const q = category.questions[value];

            document.getElementById("question").textContent = q[0];
            document.getElementById("answer").textContent = "Answer: " + q[1];

            document.getElementById("answer").style.display = "none";

            /* IMAGE SUPPORT */
            const img = document.getElementById("questionImage");

            if (q[2]) {
                img.src = q[2];
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }

            /* VIDEO SUPPORT */
            const video = document.getElementById("questionVideo");
            const videoSource = document.getElementById("videoSource");
        
            if (q[3]) {
                videoSource.src = q[3];
                video.load();
                video.style.display = "block";
        
                video.play().catch(() => {});
            } else {
                video.pause();
                video.style.display = "none";
            }
        
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
