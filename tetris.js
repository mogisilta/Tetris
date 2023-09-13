// import BLOCKS, { COL_NUM, ROW_NUM } from "./variable.js";

const rowContainer = document.querySelector(".rowContainer");
const tetrisSize = Object.freeze({
  ROW_NUM: 20,
  COL_NUM: 10,
});

let score = 0;
const scoreBoard = document.querySelector("span");

const { ROW_NUM, COL_NUM } = tetrisSize;

const BLOCKS = {
  tree: [
    [
      [0, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [2, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [1, 2],
      [2, 1],
      [1, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [2, 1],
      [1, 1],
    ],
  ],
  square: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  L: [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
  ],
  J: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 2],
    ],
  ],
  Z: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
  ],
  S: [
    [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  I: [
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
    ],
  ],
};

const movingItem = {
  left: 4,
  top: 0,
  type: Object.keys(BLOCKS)[Math.floor(Math.random() * 7)],
  direction: 0,
};

let tempMovingItem = null;

function createFrame() {
  for (let i = 0; i < ROW_NUM; i++) {
    createRow();
  }
}
function createRow() {
  const row = document.createElement("li");
  row.classList.add("row");
  const blockContainer = document.createElement("ul");
  blockContainer.classList.add("blockContainer");
  for (let i = 0; i < COL_NUM; i++) {
    const block = document.createElement("li");
    block.classList.add("block");
    blockContainer.prepend(block);
    row.prepend(blockContainer);
  }
  rowContainer.prepend(row);
}

//게임 시작
init();
function init() {
  createFrame();
  tempMovingItem = { ...movingItem };
  renderBlocks();
  setInterval(() => {
    moveBlock("ArrowDown");
  }, 500);
}

//블럭 렌더링
function renderBlocks() {
  const { left, top, type, direction } = tempMovingItem;
  BLOCKS[type][direction].forEach((block) => {
    const [row, col] = block;
    const blockClassList =
      rowContainer?.childNodes[row + top]?.childNodes[0]?.childNodes[col + left]
        ?.classList;
    if (!blockClassList?.contains("fixed")) {
      blockClassList?.add("moving", `${movingItem.type}`);
    }
  });
}

//블럭 회전
function rotate() {
  //moving class를 없앤다. 새로운 좌표(direction을 변경한)에 moving class추가
  tempMovingItem.direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  if (!isCollide()) {
    movingItem.direction = tempMovingItem.direction;
    renderBlocks();
  } else {
    tempMovingItem.direction = movingItem.direction;
    renderBlocks();
  }
}

//블럭 이동
function moveBlock(keyCode) {
  console.log(movingItem, tempMovingItem);
  switch (keyCode) {
    case "ArrowLeft":
      tempMovingItem.left -= 1;
      if (!isCollide()) {
        movingItem.left -= 1;
        removeMovingClass();
        renderBlocks();
      } else {
        removeMovingClass();
        tempMovingItem = { ...movingItem };
        renderBlocks();
      }
      break;
    case "ArrowRight":
      tempMovingItem.left += 1;
      if (!isCollide()) {
        movingItem.left += 1;
        removeMovingClass();
        renderBlocks();
      } else {
        removeMovingClass();
        tempMovingItem = { ...movingItem };
        renderBlocks();
      }
      break;
    case "ArrowDown":
      tempMovingItem.top += 1;
      if (!isCollide()) {
        movingItem.top += 1;
        removeMovingClass();
        renderBlocks();
      } else {
        removeMovingClass();
        tempMovingItem = { ...movingItem };
        renderBlocks();
        fix();
      }
      break;
    default:
      break;
  }
}

//충돌감지: 회전 // 좌우 움직일때 좌벽, 우벽 // 아래로 움직일 때 아래 벽, fixed 블럭
function isCollide() {
  removeMovingClass();
  renderBlocks();
  const movingElements = document.querySelectorAll(".moving");
  //   console.log(movingElements, "asdf");
  let crash = false;
  for (let i = 0; i < movingElements.length; i++) {
    if (movingElements[i].classList.contains("fixed")) {
      crash = true;
      //   console.log("Collision detected", tempMovingItem, movingItem);
      break;
    }
  }

  if (movingElements.length < 4) {
    crash = true;
  }
  return crash;
}

//키 이벤트 정의
document.addEventListener("keydown", (event) => {
  const keyCode = event.code;
  switch (keyCode) {
    case "ArrowLeft":
      moveBlock(keyCode);
      break;
    case "ArrowRight":
      moveBlock(keyCode);
      break;
    case "ArrowDown":
      moveBlock(keyCode);
      break;
    case "ArrowUp":
      rotate();
      break;
    default:
      break;
  }
});

//moving 클래스 제거
function removeMovingClass() {
  const movingElements = document.querySelectorAll(".moving");
  movingElements.forEach((blockElement) => {
    if (!blockElement.classList.contains("fixed")) {
      blockElement.classList.remove("moving", `${movingItem.type}`);
    }
  });
}

//블럭 고정
function fix() {
  const movingElements = document.querySelectorAll(".moving");
  movingElements.forEach((blockElement) => {
    blockElement.classList.remove("moving");
    blockElement.classList.add("fixed");
  });
  movingItem.direction = 0;
  movingItem.left = 4;
  movingItem.top = 0;
  movingItem.type = Object.keys(BLOCKS)[Math.floor(Math.random() * 7)];
  tempMovingItem = { ...movingItem };
  console.log("픽스!");
  renderBlocks();
  clearCompletedRows();
}

function clearCompletedRows() {
  const rows = document.querySelectorAll(".row");
  for (let i = rows.length - 1; i >= 0; i--) {
    // 아래에서 위로 검사
    const blocks = rows[i].querySelectorAll(".block");
    if (
      Array.from(blocks).every((block) => block.classList.contains("fixed"))
    ) {
      rows[i].remove(); // 해당 줄을 지웁니다.
      createRow(); // 새로운 줄을 맨 위에 추가합니다.
      score += 100;
      scoreBoard.innerText = score;
    }
  }
}

//벽에 대해 edge값으로 충돌 처리하려니까, 블럭끼리 충돌은 edge로 처리가 안된다.
//벽은 edge가 먼저 닿기 때문에 처리가 가능한데,
//블럭끼리는 edge가 닿지 않더라도 블럭끼리 충돌이 가능하기 때문이다.
//그럼 어차피 블럭끼리 충돌로직 새로 만들어야하는데, 비효율적
//충돌 처리 로직을 하나로 하고 싶다.
//1. 좌우벽 충돌
//temp로 이동(충돌)해놓고, moving 클래스를 가진 것 중 하나라도 undefined(or null)가 있으면
//이전 값인 movingItem으로 리렌더링한다.
//2. 아래벽 충돌
//좌우벽충돌로직+fix
//3. 벽돌끼리 충돌
//temp로 이동(충돌)해놓고, moving 클래스를 가진 것 중 하나라도 fix클래스를 가지고 있으면
//이전 값인 movingItem으로 리렌더링한다. + fix
