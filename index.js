let boxes       = [...document.querySelectorAll('.box')];
let resetButton = document.querySelector('.reset');
let turnO       = true;
let infoDisplay = document.querySelector('.info');

// straight from geeksforgeeks
const possibleWins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', function () {
        if (turnO) {
            
            infoDisplay.innerText   = "X's turn!"
            box.style.color         = 'white';
            box.innerText           = 'O';

            turnO           = false;
            box.disabled    = true;
            checkWinner();
        } else {

            infoDisplay.innerText   = "O's turn!"
            box.style.color         = 'aqua';
            box.innerText           = 'X';
            
            turnO           = true;
            box.disabled    = true;
            
            checkWinner();
        }
    });
});

const enableBoxes = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].disabled = false;
        boxes[i].innerText = "";
    }
};

const disableBoxes = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].disabled = true;
    }
};

const showWinner = (winner) => {
    infoDisplay.innerText = `Congratulations, Winner is ${winner}`;
    disableBoxes();
};

const checkWinner = () => {
    let winOnBoard = false;

    for (let pattern of possibleWins) {
        let boxOne      = boxes[pattern[0]].innerText;
        let boxTwo      = boxes[pattern[1]].innerText;
        let boxThree    = boxes[pattern[2]].innerText;

        if (boxOne != "" && boxTwo != "" && boxThree != "" &&
            boxOne == boxTwo && boxTwo == boxThree) {
            showWinner(boxOne);
            winOnBoard = true;
            pattern.forEach(i => {
                boxes[i].classList.add('win');
            });
            resetButton.innerText = 'New Game'
            disableBoxes();
            return;
        }
    }

    if (!winOnBoard) {
        let allBoxes = true;

        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].innerText === "") {
                allBoxes = false;
                break;
            }
        }
        if (allBoxes) {
            infoDisplay.innerText = 'Match Drawn';
        }
    }
};

const resetGame = () => {
    turnO = true;
    boxes.forEach(box => box.classList.remove('win'));
    infoDisplay.innerText = "O's turn"
    resetButton.innerText = 'Reset Game';
    enableBoxes();
};

resetButton.addEventListener('click', resetGame);
