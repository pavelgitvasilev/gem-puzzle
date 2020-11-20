import playSound from "./sound.js";

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let cellArr = [1, 2, 3];

  document.body.style.background = "url(assets/img/back.jpg)";
  document.body.style.backgroundSize = "cover"
  const puzzle = document.createElement("div");
  puzzle.className = "cell";
  puzzle.id = "cell";
  document.body.prepend(puzzle);


  const information = document.createElement("div");
  information.className = "info";
  information.id = "info";
  document.body.prepend(information);

  const time = document.createElement("div");
  const min = document.createElement("span");
  const sec = document.createElement("span");
  time.className = "time";
  min.id = "minutes";
  sec.id = "seconds";
  information.append(time);
  time.append(min);
  time.append(sec);
  let secCounter = 0; 
  let minCounter = 0;
  let timerId;

  const count = document.createElement("div");
  const countSpan = document.createElement("span");
  count.className = "count";
  countSpan.className = "counter";
  information.append(count);
  count.append(countSpan);
  let counter = 0;
  countSpan.innerHTML = `count : ${counter}`;
  
  const controls = document.createElement("div");
  controls.className = "controls";
  controls.id = "controls";
  document.body.append(controls);

  const solutionBtn = document.createElement("button");
  solutionBtn.className = "solution";
  solutionBtn.id = "solution";
  solutionBtn.innerHTML = "Сдаюсь!";
  controls.prepend(solutionBtn);

  let state = 1;
  let img = false;
  let sound = false;

  const menuBtn = document.createElement("button");
  menuBtn.innerHTML = "Меню";
  const popUpMenu = document.createElement("div");
  const popScore = document.createElement("div");
  popUpMenu.className = "popUp-menu";
  popScore.className = "popscore";
  const menu = document.createElement("div");
  menu.className = "menu";
  popUpMenu.append(menu);
  document.body.append(popUpMenu);
  document.body.append(popScore);
  controls.append(menuBtn);
  
  const menuName = document.createElement("span");
  const newBtn = document.createElement("div");
  const newGameBtn = document.createElement("div");
  const bestScoreBtn = document.createElement("div");

  const radio3 = document.createElement("input");
  const radio4 = document.createElement("input");
  const radio8 = document.createElement("input");
  const checkPicture = document.createElement("input");
  const checkSound = document.createElement("input");
  
  radio3.type = "radio";
  radio4.type = "radio";
  radio4.setAttribute("checked", "");
  radio8.type = "radio";
  checkPicture.type = "checkbox";
  checkSound.type = "checkbox";

  radio3.id = "3x3";
  radio4.id = "4x4";
  radio8.id = "8x8";
  checkPicture.id = "Picture";
  checkSound.id = "sound";

  const label3 = document.createElement("label");
  const label4 = document.createElement("label");
  const label8 = document.createElement("label");
  const labelBlock3 = document.createElement("div");
  const labelBlock4 = document.createElement("div");
  const labelBlock8 = document.createElement("div");
  const labelBlockSound = document.createElement("div");
  const labelBlockPicture = document.createElement("div");
  const labelPicture = document.createElement("label");
  const labelSound = document.createElement("label");

  label3.htmlFor = "3x3";
  label4.htmlFor = "4x4";
  label8.htmlFor = "8x8";
  labelPicture.htmlFor = "Picture";
  label3.innerHTML = "3x3";
  label4.innerHTML = "4x4";
  label8.innerHTML = "8x8";
  labelPicture.innerHTML = "Picture";
  labelSound.innerHTML = "Sound";

  radio3.name = "radio__name";
  radio4.name = "radio__name";
  radio8.name = "radio__name";
  checkPicture.name = "check";
  checkSound.name = "sound";

  menuName.className = "menu_title";
  menuName.innerHTML = "Меню";

  newGameBtn.innerHTML = "ПОЕХАЛИ!!";
  newGameBtn.className = "menu_item-new";  

  bestScoreBtn.innerHTML = "Лучший результат";

  newBtn.className = "menu_item";
  bestScoreBtn.className = "menu_item";

  labelBlock3.className = 'labelblock'
  labelBlock4.className = 'labelblock'
  labelBlock8.className = 'labelblock'
  labelBlockSound.className = 'labelblock'
  labelBlockPicture.className = 'labelblock'
  labelBlock3.append(radio3, label3);
  labelBlock4.append(radio4, label4);
  labelBlock8.append(radio8, label8);
  labelBlockPicture.append(checkPicture, labelPicture);
  labelBlockSound.append(checkSound, labelSound);
  menu.append(menuName, newBtn);
  newBtn.append(labelBlock3, labelBlock4, labelBlock8, labelBlockPicture, labelBlockSound, bestScoreBtn);
  newBtn.prepend(newGameBtn);
  const inputArr = document.getElementsByName("radio__name");
 
  menuBtn.addEventListener("click", () => {
    popUpMenu.classList.toggle("show");
  });
  bestScoreBtn.addEventListener("click", () => {
    popScore.classList.toggle("show");
  });
  
  popUpMenu.addEventListener("click", function (e) {
    if (e.target === popUpMenu) {
      popUpMenu.classList.remove("show");
    }
  });
  popScore.addEventListener("click", function (e) {
    if (e.target === popScore) {
      popScore.classList.remove("show");
    }
  });


  
  checkPicture.addEventListener("click", function () {
    if (checkPicture.checked === true) {
      img = true;
    } else {
      img = false;
    }
  });

  checkSound.addEventListener("click", function () {
    if (checkSound.checked === true) {
      sound = true;
    } else {
      sound = false;
    }

  });

  function chooseCellNum() {
    for (let i = 0; i < inputArr.length; i++) {
      inputArr[i].addEventListener("click", function () {
        if (inputArr[i] === inputArr[0]) {
          cellArr = Array(2);
          puzzle.classList.remove("eight");
          puzzle.classList.add("three");
          return cellArr;
        }
        if (inputArr[i] === inputArr[1]) {
          cellArr = Array(3);
          puzzle.classList.remove("three", "eight");
          return cellArr;
        }
        if (inputArr[i] === inputArr[2]) {
          cellArr = Array(7);
          puzzle.classList.remove("three");
          puzzle.classList.add("eight");
          return cellArr;
        }
      });
    }
  }
  chooseCellNum();
  newGameBtn.addEventListener("click", function () {
    chooseCellNum();
    solution();
    popUpMenu.classList.remove("show");
  });
  solution();
  scramble();
  puzzle.addEventListener("dragend", function (e) {
    if (state === 1) {
      e.target.style.opacity = "1.0";
      changeCell(e.target);
    }
  });

  puzzle.addEventListener("click", function (e) {
    if (state === 1) {
      puzzle.classList.remove("animate-fast");
      puzzle.classList.add("animate");
      changeCell(e.target);
    }
  });
  
  puzzle.addEventListener("dragstart", function (e) {
    if (state === 1) {
      e.target.style.opacity = "0.5";
      puzzle.classList.remove("animate");
      puzzle.classList.add("animate-fast");
    }
  });

	
  solutionBtn.addEventListener("click", () => {
    solution();
  });
  
  function solution(){
    if(state == 0){
      return;
    }
    puzzle.innerHTML = "";
		
    let n = 1;
    let pic = 1;

    for(let i = 0; i <= cellArr.length; i++){
      for (let j = 0; j <= cellArr.length; j++){
        let cell = document.createElement("span");
        cell.draggable = true;
        cell.id = `cell-${i}-${j}`;
        cell.classList.add(`cell${n}`);
      
        switch (cellArr.length) {
        case 2:
          cell.classList.add("three");
          cell.classList.remove("four");
          cell.classList.remove("eight");
          cell.style.left = (j * 99 + 1 * j + 1) + "px";
          cell.style.top = (i * 99 + 1 * i + 1) + "px";
          break;
        case 3:
          cell.classList.add("four");
          cell.classList.remove("three");
          cell.classList.remove("eight");
          cell.style.left = (j * 74 + 1 * j + 1) + "px";
          cell.style.top = (i * 74 + 1 * i + 1) + "px";
          break;
        case 7:
          cell.classList.add("eight");
          cell.classList.remove("three");
          cell.classList.remove("four");
          cell.style.left = (j * 36.5 + 1 * j + 1) + "px";
          cell.style.top = (i * 36.5 + 1 * i + 1) + "px";
          break;
        }
        
        if (n <= 8 && cellArr.length === 2 ||
          n <= 15 && cellArr.length === 3 ||
          n <= 63 && cellArr.length === 7) {
          cell.classList.add("number");
          cell.classList.add("cell");
          cell.innerHTML = (n++).toString();
          
          if (img) {
            
            cell.style.fontSize = "0";
          
            if (n <= 9 && cellArr.length === 2) {
              cell.style.background =
                `url("../../assets/img/image3x3/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
            if (n <= 16 && cellArr.length === 3) {
              cell.style.background =
                `url("../../assets/img/image4x4/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
            if (n <= 64 && cellArr.length === 7) {
              cell.style.background =
                `url("../../assets/img/image8x8/${pic++}.jpg") 
                center center/contain no-repeat`;
            }
          } 
        } else {
          cell.className = "empty";
        }        
        puzzle.appendChild(cell);
      }
    }
    clearTime();
  }

  function changeCell(cell) {
    if (cell.className != "empty") {
      let emptyCell = getEmptyAdjacentCell(cell);
      if (emptyCell) {
        let tmp = {
          style: cell.style.cssText,
          back: cell.style.background,
          id: cell.id,
          display: cell.style.display
        };
        
        let back = cell.style.background;
        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
        }

        cell.style.cssText = emptyCell.style.cssText;
        
        cell.style.background = back;
        cell.id = emptyCell.id;

        emptyCell.style.cssText = tmp.style;

        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
          tmp.back = back;
        }
        emptyCell.id = tmp.id;
        counter++;
        if (state === 1) {
          countSpan.innerHTML = `count : ${counter}`;
          if (secCounter === 0 && minCounter === 0) {
            getTime();
          }
          if (sound) {
            playSound();
          }
          checkOrder();
        }
      }
    }
  }
  
  function getCell(row, col) {
    return document.getElementById("cell-"+row+"-"+col);
  }

  function getEmptyCell(){
    return puzzle.querySelector(".empty");
  }

	
  function getEmptyAdjacentCell(cell){
    let adjacent = getAdjacentCells(cell);
    for (let i = 0; i < adjacent.length; i++){
      if (adjacent[i].className == "empty") {
        return adjacent[i];
      }
    }
    return false;
  }

  function getAdjacentCells(cell) {
    let id = cell.id.split("-");

    let row = parseInt(id[1]);
    let col = parseInt(id[2]);
		
    let adjacent = [];

    if (row < cellArr.length) {
      adjacent.push(getCell(row + 1, col));
    }			
    if (row > 0) {
      adjacent.push(getCell(row - 1, col));
    }
    if (col < cellArr.length) {
      adjacent.push(getCell(row, col + 1));
    }
    if (col > 0) {
      adjacent.push(getCell(row, col - 1));
    }
    return adjacent;
  }

  function checkOrder() {
    if (getCell(cellArr.length, cellArr.length).className != "empty") {
      return;
    }
	
    let n = 1;
    for(let i = 0; i <= cellArr.length; i++){
      for (let j = 0; j <= cellArr.length; j++){
        
        if (n <= 8 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 2) {
          return;
        }
        if (n <= 15 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 3) {
          return;
        }
        if (n <= 63 &&
          getCell(i, j).innerHTML != n.toString() &&
          cellArr.length === 7) {
          return;
        }
        n++;
      }
    }
    saveScoreResult();
    menuName.innerHTML = `Победное время:  ${minCounter} минут ${secCounter} секунуд. Ходы - ${counter}`;
    clearTime();
    popUpMenu.classList.add("show");
    
  }

  function scramble() {
    
    if(state == 0){
      return;
    }

    puzzle.classList.remove("#cell");
    state = 0;

    let previousCell;
    let i = 1;
    let interval = setInterval(function(){
      if(i <= 200){
        let adjacent = getAdjacentCells(getEmptyCell());
        if(previousCell){
          for(let j = adjacent.length-1; j >= 0; j--){
            if(adjacent[j].innerHTML == previousCell.innerHTML){
              adjacent.splice(j, 1);
            }
          }
        }
        previousCell = adjacent[rand(0, adjacent.length - 1)];
        shiftCell(previousCell);
        i++;
      } else {
        clearInterval(interval);
        state = 1;
        clearTime();
        cellsArr();
      }
    }, 20);
  }
  function cellsArr() {
    let c = document.querySelectorAll("[id^='cell']");
    let obj = {};
    let idArr = [];
    for (let i = 0; i < c.length; i++){
      idArr.push(c[i].id);
      obj[c[i].id] = c[i].innerHTML;
    }
  }
  function rand(from, to){
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  function shiftCell(cell) {
    if (cell.className != "empty") {
      let emptyCell = getEmptyAdjacentCell(cell);
      if (emptyCell) {
        let tmp = {
          style: cell.style.cssText,
          back: cell.style.background,
          id: cell.id,
          display: cell.style.display
        };
        
        let back = cell.style.background;
        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
        }

        cell.style.cssText = emptyCell.style.cssText;
        
        cell.style.background = back;
        cell.id = emptyCell.id;

        emptyCell.style.cssText = tmp.style;

        if (img) {
          emptyCell.style.background = "none";
          emptyCell.style.fontSize = "0";
          tmp.back = back;
        }
        emptyCell.id = tmp.id;
        counter++;
        if (state === 1) {
          countSpan.innerHTML = `count : ${counter}`;
          if (secCounter === 0 && minCounter === 0) {
            getTime();
          }
          if (sound) {
            playSound();
          }
          checkOrder();
        }
      }
    }
  }
  newGameBtn.addEventListener('click', () => {
    // solution();
    scramble();
  })
  function getTime() {
    if (secCounter === 0 && minCounter === 0) {
      timerId = setInterval(getTime, 1000);
    }
    secCounter++;
    if (secCounter >= 59) {
      secCounter = 0;
      minCounter++;
    }
    if (minCounter < 10) {
      min.innerHTML = `Вы справились за 0${minCounter} `;
    } else {
      min.innerHTML = `Вы справились за ${minCounter} `;
    } 
    if (secCounter < 10) {
      sec.innerHTML = `: 0${secCounter}`;
    } else {
      sec.innerHTML = `: ${secCounter}`;
    }
    console.log(secCounter)
  }

  function clearTime() {
    clearInterval(timerId);
    secCounter = 0;
    minCounter = 0;
    min.innerHTML = `Время 0${minCounter} `;
    sec.innerHTML = `: 0${secCounter}`;
    counter = 0;
    countSpan.innerHTML = `количество ходов : ${counter}`;
  }

  function scorePopUp() {
    const scoreList = document.createElement("ol");
    const menu = document.createElement("div");
    menu.className = "menu";
    scoreList.className = "score_list";
    popScore.append(menu);
    menu.append(scoreList);


    let listItems = document.createElement("li");
    listItems.className = "list_item";
    listItems.innerHTML = "Пусто";
    scoreList.append(listItems);
  }
  scorePopUp();
  let scoreArr = [];
  
  function saveScoreResult() {
    scoreArr.push(`Время: ${minCounter} минут ${secCounter} секунд. Ходов : ${counter}<br>`);
    scoreArr.sort(function (a, b) {
      return a - b;
    });
    
    let scoreList = document.querySelector(".list_item");
    scoreList.innerHTML = scoreArr;

  }
  


});   
