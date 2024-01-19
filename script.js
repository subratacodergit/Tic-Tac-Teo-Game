const boxs = document.querySelectorAll(".box");
let turnO = false;
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

boxs.forEach(box => {
    box.addEventListener("click", () => {
        document.getElementById("clickSound").play();
        
        // scale the vox on click
        box.style.scale = "1.1";
        setTimeout(()=>{
        box.style.scale = "1";
        }, 700);
        
        if (!turnO) {
            box.innerText = "X";
            turnO = true;
            box.style.color = "#59c3c3";
        } else {
            box.innerText = "O";
            turnO = false;
            box.style.color = "#a63a50";
        }
        box.disabled = true;

        for (let patarn of patarns) {
            const positionIn1 = boxs[patarn[0]].innerText;
            const positionIn2 = boxs[patarn[1]].innerText;
            const positionIn3 = boxs[patarn[2]].innerText;

            if (positionIn1 != "" && positionIn2 != "" && positionIn3 != "") {
                if (positionIn1 == positionIn2 && positionIn2 == positionIn3) {
                    showWinner(positionIn1);
                }
            }
        }
    });
});

const restartBtns = document.querySelectorAll(".Re_btn");

restartBtns[0].addEventListener("click", Restart);
restartBtns[1].addEventListener("click", () => {
    Restart();
    document.getElementById("result_box").classList.add("hide");
});

function Restart() {
    for (let box of boxs) {
        box.innerText = "";
        box.disabled = false;
    }
    
    // scroll to the game
    window.scrollTo(0,0);
}

function showWinner(winner) {
    document.getElementById("overSound").play();
    document.getElementById("result").innerText = `${winner}`;
    document.getElementById("result_box").classList.remove("hide");
    restartBtns[0].classList.add("hide");
 
// scroll to the result
window.scrollBy(0,400);

    for (let box of boxs) {
        box.disabled = true;
    }
}
