const gameboard = document.querySelector('#gameboard');
const info = document.querySelector('#info');
const startCells = ["", "", "", "", "", "", "", "", ""];
//처음 순서
let go ='circle';
info.textContent = "Circle먼저 시작"


function createBoard() {
  startCells.forEach((_cell, index) => {
    //각각의 셀(9)에 div태그 만들어서 클래스 square추가 id 추가 클릭 이벤트
    //추가해서 게임보드에 자식으로 붙임. _cell은 반복문의 각각 요소 말함.index 이터레이트 숫자
    const cellElement = document.createElement('div');
    cellElement.classList.add('square');
    cellElement.id = index;
    cellElement.addEventListener('click', addGo);
    gameboard.append(cellElement);  //9개의 div 태그 추가됨
  });//이것을 9번 반복함.
}

function addGo(e) {
    //console.log(e.target);
    //선택한 셀에 div태그 클래스circle또는 cross을 붙여서 붙임.
    const goDisplay = document.createElement('div');
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = (go ==="circle") ? "cross" : "circle";
    info.textContent = go +"턴입니다.";
    e.target.removeEventListener('click',addGo); 
    //다시 클릭이 안되도록 클릭 이벤트 제거
    //승리체크
    checkScore();
}

function checkScore(){
    const allSquares = document.querySelectorAll('.square'); //모든 셀
    //이길 수 있는 3개의 연속좌표(가로,세로,대각선)
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    //이중배열
    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>   
            //cell은 각 배열의 첫열을 말함. 
            allSquares[cell].firstChild?.classList.contains("circle")
         );

         if (circleWins) {
            info.textContent = "circleWins입니다."
            allSquares.forEach((square)=>
                square.replaceWith(square.cloneNode(true))
            );
            return;
         }
         
    })
}



createBoard();