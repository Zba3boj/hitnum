//DOM Selection
const hit = document.querySelector('.attri-hit')

const score = document.querySelector('.attri-score')
const wrong = document.querySelector('.attri-wrong')
const bubbleGroup = document.querySelector('.game-box-bubbles')

const resultContainer = document.querySelector('.result-container')

const bubbleNumber = 96;


//Generate Random Hit Number
let hitNumber = Math.floor((Math.random() * 10) + 1);
let maxScore = 0;
hit.innerHTML = hitNumber;

//Generate Random Bubbles
let bubblesGroupMarkup = "";
for (let i = 1; i < bubbleNumber; i++) {
    let random = Math.floor((Math.random() * 10) + 1);
    bubblesGroupMarkup += `<div class="bubble">${random}</div>`
    if (random === hitNumber) {
        maxScore++;
    }
}
bubbleGroup.innerHTML = bubblesGroupMarkup


//TIMER LOGIC-------------------------------------------------------------------------------------
const timer = document.querySelector('.attri-timer')

let countDown = 60;

const timing = setInterval(() => {
    if (countDown <= 60 && countDown >= 0) {
        timer.innerHTML = `${countDown}s`;
        countDown--;
    } else {
        //resultContainer.style.display = 'flex';
        resultContainer.style.width = '100vw';

        resultContainer.innerHTML = `
                <div class="result-box">
                <div class="result-desc">
                    <span class="result-score-title">Your Score : ${yourScore}</span>
                    <span class="result-score" style="color:orange;">Time Over ⌛</span>
                </div>
                <div class="button-box">
                    <button onclick="reset()">Play Again</button>
                </div>
            </div>`;

        clearInterval(timing)
    }
}, 1000)


//GAME LOGIC----------------------------------------------------------------------------------------
//GAME Variable
let yourScore = 0;
let rightAttempt = 0;
let wrongAttempt = 0;

//DOM Selection
const bubbleButton = document.querySelectorAll('.bubble')

//On Each Click Of Bubble Div
for (let i = 0; i < bubbleButton.length; i++) {
    bubbleButton[i].addEventListener('click', () => {
        //When user click on right number or wrong number
        if (bubbleButton[i].innerHTML === hit.innerHTML) {
            yourScore++;
            rightAttempt++;
            score.innerHTML = yourScore;
            bubbleButton[i].style.background = 'linear-gradient(to top left,#48ff00,#f6ff6a)';
            bubbleButton[i].style.color = 'green';
            bubbleButton[i].style.pointerEvents = 'none';

        } else {
            yourScore--;
            wrongAttempt++;
            score.innerHTML = yourScore;
            wrong.innerHTML = wrongAttempt;
            bubbleButton[i].style.background = 'linear-gradient(to top left,#ff0000,#ff6a95)';
            bubbleButton[i].style.pointerEvents = 'none';

        }

        //Game Decide Rules
        if (rightAttempt === maxScore || wrongAttempt >= 5) {
            //Show Result Container
            //resultContainer.style.display = 'flex';
            resultContainer.style.width = '100vw';
            //Stop Timer
            clearInterval(timing)

            if (yourScore === maxScore) {
                resultContainer.innerHTML = `
                <div class="result-box">
                <div class="result-desc">
                    <span class="result-score-title">Your Score : ${yourScore}</span>
                    <span class="result-score" style="color:greenyellow;">Won 👑</span>
                </div>
                <div class="button-box">
                    <button onclick="reset()">Play Again</button>
                </div>
            </div>`;
            } else if (yourScore >= 0 && yourScore < maxScore) {
                resultContainer.innerHTML = `
                <div class="result-box">
                <div class="result-desc">
                    <span class="result-score-title">Your Score : ${yourScore}</span>
                    <span class="result-score">Nice Try 👍</span>
                </div>
                <div class="button-box">
                    <button onclick="reset()">Play Again</button>
                </div>
            </div>`;
            } else {
                resultContainer.innerHTML = `
                <div class="result-box">
                <div class="result-desc">
                    <span class="result-score-title">Your Score : ${yourScore}</span>
                    <span class="result-score" style="color:red;">Loose 👎</span>
                </div>
                <div class="button-box">
                    <button onclick="reset()">Play Again</button>
                </div>
            </div>`;
            }
        }
    })
}


//Game Reset Function ----------------------------------------------------------------------------
function reset() {
    location.reload();
}
