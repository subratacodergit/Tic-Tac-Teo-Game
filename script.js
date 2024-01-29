const boxs = document.querySelectorAll(".box");
let yourTurn = true;
let boxClicked = 0;
const patarns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// adding game mode
let buttonName;
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.getElementById("game_box").style.display = "block";
        document.querySelector(".mode").style.display = "none";
        
      buttonName =  btn.innerText;
    });
});

// adding eventlistener for user click
boxs.forEach(box => {
    box.addEventListener("click", () => {
      clickBtn(box);
      
      if(buttonName == "COM"){
         setTimeout(random, 700);
      }
      
    });
});

// adding fuction for button click feadback
function clickBtn(box) {
    document.getElementById("clickSound").play();

    // scale the box on click
    box.style.scale = "1.1";
    setTimeout(() => {
        box.style.scale = "1";
    }, 700);

    if (yourTurn) {
        box.innerText = "X";
        box.style.color = "#59c3c3";
        yourTurn = false;
    } else {
        box.innerText = "O";
        box.style.color = "#a63a50";
        yourTurn = true;
    }

    box.disabled = true;
    boxClicked++;
    checkWin();
}

// adding function for ramdom click
function random() {
    randomClick(Math.floor(Math.random() * 9));
}
function randomClick(index) {
    const randomIndex = index;

    if (boxs[randomIndex].disabled) {
        random();
    } else {
        clickBtn(boxs[randomIndex]);
    }
}

// adding restart function
const restartBtns = document.querySelectorAll(".Re_btn");

restartBtns[0].addEventListener("click", Restart);
restartBtns[1].addEventListener("click", () => {
    Restart();
    document.getElementById("result_box").classList.add("hide");
    document.querySelector(".mode").style.display = "flex";
    document.querySelector("#game_box").style.display = "none";
});

function Restart() {
    for (let box of boxs) {
        box.innerText = "";
        box.disabled = false;
    }
    restartBtns[0].classList.remove("hide");
    // scroll to the game
    window.scrollTo(0, 0);

    yourTurn = true;
}

// for show winner
function checkWin() {
    for (let patarn of patarns) {
        const positionIn1 = boxs[patarn[0]].innerText;
        const positionIn2 = boxs[patarn[1]].innerText;
        const positionIn3 = boxs[patarn[2]].innerText;

        if (positionIn1 != "" && positionIn2 != "" && positionIn3 != "") {
            if (positionIn1 == positionIn2 && positionIn2 == positionIn3) {
                showWinner(` Congatulation winner is ${positionIn1}`);
            } else if (boxs.length === boxClicked) {
                showWinner("The Match is Draw");
            }
        }
    }
}

function showWinner(winner) {
    document.getElementById("overSound").play();
    document.getElementById("result").innerText = `${winner}`;
    document.getElementById("result_box").classList.remove("hide");
    restartBtns[0].classList.add("hide");

    // scroll to the result
    window.scrollBy(0, 400);

    for (let box of boxs) {
        box.disabled = true;
    }

    boxClicked = 0;
}
