document.addEventListener("DOMContentLoaded", () => {
  const openClicker = document.getElementById("openClicker");
  const clickerContainer = document.getElementById("clicker_container");
  const clickerRules = document.getElementById("clicker_rules");
  const startClicker = document.getElementById("startClicker");
  const closeClicker = document.querySelector(".close-clicker");

  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const gameArea = document.getElementById("gameArea");

  let currentGameScore = 0;
  let timer = 15;
  let interval = null;
  let gameEnded = false;

  const normalItems = [
    { icon: "clicker-img/cake.png", value: 2 },
    { icon: "clicker-img/cacao.png", value: 4 },
    { icon: "clicker-img/cookie-tree.png", value: 6 },
  ];

  const rareItems = [
    { icon: "clicker-img/crystal.png", value: 15 }
  ];

  /* ================= OPEN ================= */

  openClicker.addEventListener("click", () => {
    clickerRules.classList.add("active");
  });

  startClicker.addEventListener("click", () => {
    clickerRules.classList.remove("active");
    clickerContainer.classList.add("active");
    startGame();
  });

  closeClicker.addEventListener("click", () => {
    endGame(true);
    clickerContainer.classList.remove("active");
  });

  /* ================= GAME ================= */

  function startGame() {
    currentGameScore = 0;
    gameEnded = false;
    timer = 17;

    scoreDisplay.textContent = "0";
    timerDisplay.textContent = `⏳ ${timer}`;
    gameArea.innerHTML = "";

    spawnObject();

    interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = `⏳ ${timer}`;
      if (timer <= 0) endGame(false);
    }, 1000);
  }

  function endGame(isManualExit = false) {
    if (gameEnded) return;
    gameEnded = true;

    clearInterval(interval);
    gameArea.innerHTML = "";

    if (!isManualExit && currentGameScore > 0 && window.updateBalance) {
      window.updateBalance(currentGameScore);
      showClickerResult(currentGameScore);
    }
  }

  function spawnObject() {
    if (gameEnded) return;

    gameArea.innerHTML = "";

    const chance = Math.random();
    const item = chance < 0.1
      ? rareItems[0]
      : normalItems[Math.floor(Math.random() * normalItems.length)];

    const obj = document.createElement("img");
    obj.src = item.icon;
    obj.className = "click-object";

    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;

    obj.style.left = `${Math.random() * maxX}px`;
    obj.style.top = `${Math.random() * maxY}px`;

    obj.addEventListener("click", () => {
      if (gameEnded) return;
      currentGameScore += item.value;
      scoreDisplay.textContent = currentGameScore;
      spawnObject();
    });

    gameArea.appendChild(obj);
  }

  /* ================= RESULT MODAL ================= */

  function showClickerResult(reward) {
    let modal = document.getElementById("clickerResultModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "clickerResultModal";
      modal.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,.75);
        display:flex; align-items:center; justify-content:center; z-index:9999;
      `;
      modal.innerHTML = `
        <div class="mdl-result">
          <h2>🎉 Вітаємо!</h2>
          <p></p>
          <button id="closeClickerResultBtn">OK</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.querySelector("p").innerHTML = `Ти заробив <strong>${reward}</strong> 💰`;
    modal.style.display = "flex";

    document.getElementById("closeClickerResultBtn").onclick = () => {
      modal.style.display = "none";
      clickerContainer.classList.remove("active");
    };
  }

});
