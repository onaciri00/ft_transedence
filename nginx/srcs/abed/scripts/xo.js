let boxes = document.querySelectorAll(".box");

let turn = "X";

let isGmaeovaer = false;

/**/
const mainGrid = document.querySelector('.main_grid'); 

boxes.forEach(e  => {
    e.innerHTML = ""
    e.addEventListener("click", ()=>{
            if (!isGmaeovaer && e.innerHTML === ""){
                e.innerHTML = turn;
                e.classList.add('filled'); 
                CheckWin();
                CheckDraw();
                ChangeTurn();
            }
        })
})

function ChangeTurn(){
    if (turn === "X")
    {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
        document.querySelector(".bg").style.backgroundColor = "#08D9D6";
        mainGrid.classList.add('player-o-turn');
    }
    else
    {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
        document.querySelector(".bg").style.backgroundColor = "#FF2E63";
        mainGrid.classList.remove('player-o-turn');
    }
}

function CheckWin()
{
    let WinCondation = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < WinCondation.length; i++)
    {
        let v0 = boxes[WinCondation[i][0]].innerHTML;
        let v1 = boxes[WinCondation[i][1]].innerHTML;
        let v2 = boxes[WinCondation[i][2]].innerHTML;
        if (v0 != "" && v0 === v1&& v0 === v2){
            isGmaeovaer = true;
            storeResult(turn);
            document.querySelector("#result").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline";
            for (let j = 0; j < 3; j++)
            {
                boxes[WinCondation[i][j]].style.backgroundColor = "#00ffa2";
                boxes[WinCondation[i][j]].style.color = "#000";
            }
        }
    }
}


function CheckDraw()
{
    if (!isGmaeovaer)
    {
        let isDraw = true;
        boxes.forEach(e =>
            {
                if (e.innerHTML === "") 
                    isDraw = false;
            })
        if (isDraw)
        {
            isGmaeovaer = true;
            storeResult('draw');
            document.querySelector("#result").innerHTML = " draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

const playAgain = ()=> {
    isGmaeovaer = false;
    // box.classList.remove('filled');
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#result").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    });
}

document.querySelector("#play-again").addEventListener("click", playAgain);

function storeResult(winner) {
    fetch('http://127.0.0.1:8000/api/store-result/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            winner: winner,
            date: new Date().toISOString()
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const mainXO = document.querySelector(".main_Xo");
const xoFunction = () => {
    mainXO.style.display = "block";
    document.querySelector("#design").style.filter = "blur(3px)";
    document.querySelector("#games").style.filter = "blur(3px)";
    document.querySelector("#nav").style.filter = "blur(3px)";
}

const xoDiv = document.querySelector("#XO");
xoDiv.addEventListener("click", xoFunction);

const closeFunction = () => {
    playAgain();
    mainXO.style.display = "none";
    document.querySelector("#design").style.filter = "blur(0px)";
    document.querySelector("#games").style.filter = "blur(0px)";
    document.querySelector("#nav").style.filter = "blur(0px)";
}

const closeBtn = document.querySelector(".btn-close");
closeBtn.addEventListener("click", closeFunction);