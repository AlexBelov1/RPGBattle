const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector("#start");
const healthList = document.querySelector("#health-list");
const board = document.querySelector("#board");
const mageHealth = document.getElementById("mage-health");
const monsterHealth = document.getElementById("monster-health");
const skillMage = document.getElementById("skill-mage");

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
    },
  ],
};
const mage = {
  maxHealth: null,
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
    },
  ],
};
//везде начальный 0,что позволит использовать любой скилл
let cooldownMoveMage = [
  0,
  0, //4
  0, //3
  0, //4
];

let cooldownMoveMonster = [
  //везде начальный 0,что позволит использовать любой скилл
  0,
  0, //3
  0, //2
];

const monsterSkill = monster.moves;
const mageSkill = mage.moves;

// Для подсказки
for (let i = 0; i < mageSkill.length; i++) {
  document.getElementById(
    `skill${i}`
  ).innerHTML = `Физ.урон:${mageSkill[i].physicalDmg}
  Маг.урон:${mageSkill[i].magicDmg}
  Физ.броня:${mageSkill[i].physicArmorPercents}
  Маг.броня:${mageSkill[i].magicArmorPercents}
  Откат:${mageSkill[i].cooldown} хода`;
}

//Открытие второй страницы после кнопки Начать игру
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

//Открытие страницы с игрой после выбора очков здоровья мага
healthList.addEventListener("click", (event) => {
  if (event.target.classList.contains("health-btn")) {
    mage.maxHealth = parseInt(event.target.getAttribute("data-health"));
    screens[1].classList.add("up");
    startGame();
  }
});

let randomMonsterSkill;
function startGame() {
  monsterHealth.innerHTML = `${monster.maxHealth}`;
  mageHealth.innerHTML = `${mage.maxHealth}`;
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  cooldownMoveMage = [0, 0, 0, 0];
  cooldownMoveMonster = [0, 0, 0];
  for (let i = 0; i < cooldownMoveMage.length; i++) {
    document.getElementById(`cooldown${i}`).innerHTML = "Готов";
  } //добавить для монстра
}

//Проверка на конец игры
function finishGame() {
  let result;
  if (mage.maxHealth <= 0 && monster.maxHealth <= 0) {
    result =
      `Вы убили монстра, но погибли сами ` +
      '<img src="images/victory.png" alt="ничья" >';
    return (board.innerHTML = result);
  }
  if (mage.maxHealth <= 0) {
    result = `Вы проиграли ` + '<img src="images/victory.png" alt="ничья" >';
    return (board.innerHTML = result);
  }
  if (monster.maxHealth <= 0) {
    result =
      `Вы победили монстра` + '<img src="images/victory.png" alt="ничья" >';
    return (board.innerHTML = result);
  }
}
let monsterMoves = "";
// Функция рандома скилла монстра
function getRandomMonsterSkill() {
  const index = Math.floor(Math.random() * monsterSkill.length);
  if (cooldownMoveMonster[index] !== 0) {
    cooldownMoveMonster[index] -= 1;
    index = Math.floor(Math.random() * monsterSkill.length);
  }
  randomMonsterSkill = monsterSkill[index];
  monsterMoves += `<div class="move"> ${monsterSkill[index].name} </div>`;
  return (
    (document.getElementById("movesMonster").innerHTML = monsterMoves),
    randomMonsterSkill
  );
}

// Функция хода
function move(monsterSkill, mageSkill) {
  if (isDamageMonster(monsterSkill, mageSkill))
    mage.maxHealth =
      mage.maxHealth - monsterSkill.physicalDmg - monsterSkill.magicDmg;
  if (isDamageMage(monsterSkill, mageSkill))
    monster.maxHealth =
      monster.maxHealth - mageSkill.physicalDmg - mageSkill.magicDmg;
  return monster.maxHealth, mage.maxHealth;
}
// Функции проверки нанесения урона
function isDamageMonster(monsterSkill, mageSkill) {
  if (
    monsterSkill.physicalDmg > mageSkill.physicArmorPercents ||
    monsterSkill.magicDmg > mageSkill.magicArmorPercents
  )
    return true;
}
function isDamageMage(monsterSkill, mageSkill) {
  if (
    mageSkill.physicalDmg > monsterSkill.physicArmorPercents ||
    mageSkill.magicDmg > monsterSkill.magicArmorPercents
  )
    return true;
}
// Функции скиллов мага
cadiloDmg.onclick = function () {
  cooldownMoveMage[0] = 0;
  skillClick(0);
};
leftHeelDmg.onclick = function () {
  cooldownMoveMage[1] = 4;
  skillClick(1);
};
fireBallDmg.onclick = function () {
  cooldownMoveMage[2] = 3;
  skillClick(2);
};
magicBlock.onclick = function () {
  cooldownMoveMage[3] = 4;
  skillClick(3);
};

// Кнопка новой игры
newGame.onclick = function () {
  screens[1].classList.remove("up");
};

let mageMoves = "";
function skillClick(num) {
  console.log(mageSkill[num]);
  move(randomMonsterSkill, mageSkill[num]);
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  cooldownChange(num);
  console.log(cooldownMoveMage);
  if (monster.maxHealth > 0) {
    monsterHealth.innerHTML = `${monster.maxHealth}`;
  } else {
    monsterHealth.innerHTML = "0";
  }
  if (mage.maxHealth > 0) {
    mageHealth.innerHTML = `${mage.maxHealth}`;
  } else {
    mageHealth.innerHTML = "0";
  }
  mageMoves += `<div class="move">${mage.moves[num].name} </div>`;
  document.getElementById("moves").innerHTML = mageMoves;
  finishGame();
}

// Функция проверки доступности ходов по КД
function cooldownChange(num) {
  for (let i = 0; i < cooldownMoveMage.length; i++) {
    if (cooldownMoveMage[i] !== 0 && i !== num) {
      cooldownMoveMage[i] -= 1;
    }
    if (cooldownMoveMage[i] !== 0) {
      document.getElementsByClassName(`${i}`)[0].setAttribute("disabled", true);
    } else if (document.getElementsByClassName(`${i}`)[0].disabled) {
      document.getElementsByClassName(`${i}`)[0].removeAttribute("disabled");
    }
    if (cooldownMoveMage[i] !== 0) {
      document.getElementById(
        `cooldown${i}`
      ).innerHTML = `Перезарядка ${cooldownMoveMage[i]} ходов`;
    } else {
      document.getElementById(`cooldown${i}`).innerHTML = "Готов";
    }
  }
}

// Функция вызова скилла монстра с КД, сделать красивую страницу поражения\ybxmz, попробовать пофиксить див с ходами
