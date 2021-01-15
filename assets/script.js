// Pseudo-elemente de explicat RAZVAN

let button = document.querySelector(".big-button");
let retryButton = document.getElementById("retry");
let seconds = document.querySelector("#time");
let player1Image = document.querySelector("#playerImage1");
let player2Image = document.querySelector("#playerImage2");

let player1Status = {
    score: 0,
    choice: null
}

let player2Status = {
    score: 0,
    choice: null
};

let counter = 0;

const controls = {
    player1: {
        a: "rock",
        s: "paper",
        d: "scissors",
        keyList: ["a", "s", "d"]
    },
    player2: {
        j: "rock",
        k: "paper",
        l: "scissors",
        keyList: ["j", "k", "l"]
    }
}

button.addEventListener("click", (event) => triggerGame(event));
window.addEventListener("keypress", (event) => handleUserInteractions(event));

function triggerGame(event) {
    event.stopPropagation();
    if (counter !== 0) {
        return;
    }

    let timer = setInterval(() => {
        seconds.innerHTML = 5 - counter;

        if (counter === 5) {
            clearInterval(timer);
            processData();
            counter = 0;
        } else {
            counter += 1;
        }
    }, 1000);

}

function handleUserInteractions(event) {
    if (counter === 0) { return; }

    const moveSet1 = controls.player1.keyList;
    const moveSet2 = controls.player2.keyList;
    const currentKey = event.key;

    if (moveSet1.includes(currentKey)) {
        player1Status.choice = currentKey;
    } else if (moveSet2.includes(currentKey)) {
        player2Status.choice = currentKey;
    }
}

function processData() {
    console.log(player1Status.choice);
    console.log(player2Status.choice);

    const player1Choice = controls.player1[player1Status.choice];
    const player2Choice = controls.player2[player2Status.choice];

    player1Image.style.backgroundImage = "url(images/" + player1Choice + ".png)";
    player2Image.style.backgroundImage = "url(images/" + player2Choice + ".png)";

    const winner = findWinner(player1Choice, player2Choice);
    if (winner === "1") {
        player1Status.score += 1;
    } else if (winner === "2") {
        player2Status.score += 1;
    } else {
        player1Status.score += 1;
        player2Status.score += 1;
    }

    document.getElementById("player1Score").innerHTML = player1Status.score;
    document.getElementById("player2Score").innerHTML = player2Status.score;
}

function findWinner(choice1, choice2) {
    if (choice1 === undefined) {
        return "2";
    }
    if (choice2 === undefined) {
        return "1";
    }
    if (choice1 === "rock") {
        if (choice2 === "scissors") {
            return "1";
        } else if (choice2 === "paper") {
            return "2";
        }
    }

    if (choice1 === "paper") {
        if (choice2 === "rock") {
            return "1";
        } else if (choice2 === "scissors") {
            return "2";
        }
    }


    if (choice1 === "scissors") {
        if (choice2 === "rock") {
            return "2";
        } else if (choice2 === "paper") {
            return "1";
        }
    }

    return '0';
};

retryButton.addEventListener("click", function () {
    player1Status.score = 0;
    player2Status.score = 0;

    document.getElementById("player1Score").innerHTML = player1Status.score;
    document.getElementById("player2Score").innerHTML = player2Status.score;
})

let playerInput1 = document.querySelector(".playerInput1");
let playerInput2 = document.querySelector(".playerInput2");
let playerStandard = document.querySelector(".fontTitle");
let playerName1 = document.getElementById("player1");
let playerName2 = document.getElementById("player2");


playerName1.addEventListener("click", function () {
    playerInput1.style.zIndex = "99";
})

playerName2.addEventListener("click", function () {
    playerInput2.style.zIndex = "99";
})

playerInput1.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        playerInput1.style.zIndex = "-5";
        playerName1.querySelector("span").innerHTML = playerInput1.value;
    }
});


playerInput2.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        playerInput2.style.zIndex = "-5";
        playerName2.querySelector("span").innerHTML = playerInput2.value;
    }
});











