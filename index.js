const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector("#start");
const healthList = document.querySelector("#health-list");
const board = document.querySelector("#board");
const mageHealth = document.getElementById("mage-health");
const monsterHealth = document.getElementById("monster-health");

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
const cooldownMove = {
  "Удар когтистой лапой": 0,
  "Огненное дыхание": 3,
  "Удар хвостом": 2,
  "Удар боевым кадилом": 0,
  "Вертушка левой пяткой": 4,
  "Каноничный фаербол": 3,
  "Магический блок": 4,
};
const monsterSkill = monster.moves;
const mageSkill = mage.moves;

for (let i = 0; i < mageSkill.length; i++) {
  console.log(document.getElementById(`#skill ${i}`));
  console.log(document.getElementById(`skill${i}`));
  // console.log(`${mageSkill[i]}`);
  document.getElementById(`skill${i}`).innerHTML = `${mageSkill[i]}`;
}

// mageSkill.map((el, i) => document.getElementById(`skill${i}`).innerHTML);

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

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
}

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    craeteRandomCircle();
  }
});

//Проверка на конец игры
function finishGame() {
  let result;
  if (mage.maxHealth <= 0 && monster.maxHealth <= 0) {
    result = `Вы убили монстра, но погибли сами `;
    return (board.innerHTML = result);
  }
  if (mage.maxHealth <= 0) {
    result = `Вы проиграли `;
    return (board.innerHTML = result);
  }
  if (monster.maxHealth <= 0) {
    result = `Вы победили монстра`;
    return (board.innerHTML = result);
  }
}
// Функция рандома скилла монстра
function getRandomMonsterSkill() {
  const index = Math.floor(Math.random() * monsterSkill.length);
  randomMonsterSkill = monsterSkill[index];
  return randomMonsterSkill;
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

// Функция проверки нанесения урона

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

// Функции скиллов монстра

// Функции скиллов мага
cadiloDmg.onclick = function () {
  console.log(mageSkill[0]);
  move(randomMonsterSkill, mageSkill[0]);
  console.log(monster.maxHealth);
  console.log(mage.maxHealth);
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  monsterHealth.innerHTML = `${monster.maxHealth}`;
  mageHealth.innerHTML = `${mage.maxHealth}`;
  finishGame();
};

leftHeelDmg.onclick = function () {
  console.log(mageSkill[1]);
  move(randomMonsterSkill, mageSkill[1]);
  console.log(monster.maxHealth);
  console.log(mage.maxHealth);
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  monsterHealth.innerHTML = `${monster.maxHealth}`;
  mageHealth.innerHTML = `${mage.maxHealth}`;
  finishGame();
};
fireBallDmg.onclick = function () {
  console.log(mageSkill[2]);
  move(randomMonsterSkill, mageSkill[2]);
  console.log(monster.maxHealth);
  console.log(mage.maxHealth);
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  monsterHealth.innerHTML = `${monster.maxHealth}`;
  mageHealth.innerHTML = `${mage.maxHealth}`;
  finishGame();
};
magicBlock.onclick = function () {
  console.log(mageSkill[3]);
  move(randomMonsterSkill, mageSkill[3]);
  console.log(monster.maxHealth);
  console.log(mage.maxHealth);
  getRandomMonsterSkill();
  console.log(randomMonsterSkill);
  monsterHealth.innerHTML = `${monster.maxHealth}`;
  mageHealth.innerHTML = `${mage.maxHealth}`;
  finishGame();
};

// Кнопка новой игры
newGame.onclick = function () {
  screens[1].classList.remove("up");
};
