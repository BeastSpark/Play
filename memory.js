document.addEventListener("DOMContentLoaded", () => {

  const openMemoryBtn = document.getElementById("openMemory");
  const memoryRules = document.getElementById("memory_rules");
  const startMemoryBtn = document.getElementById("startMemory");
  const memoryContainer = document.getElementById("memory_container");
  const memoryArea = document.getElementById("memoryArea");
  const closeMemoryBtn = document.querySelector(".close-memory");
  const memoryTimerEl = document.getElementById("memory_timer");
  const matchesEl = document.getElementById("matches");

  let cards = [];
  let flippedCards = [];
  let matches = 0;
  let timer = 60;
  let memoryInterval;
  let mistakes = 0;
  const BASE_REWARD = 100;

  /* ================= OPEN / CLOSE ================= */

  openMemoryBtn.addEventListener("click", () => {
    memoryRules.classList.add("active");
  });

  memoryRules.querySelector(".close-rules").addEventListener("click", () => {
    memoryRules.classList.remove("active");
  });

  startMemoryBtn.addEventListener("click", () => {
    memoryRules.classList.remove("active");
    memoryContainer.classList.add("active");

    resetState();
    setupMemoryGame();
    showCardsBriefly();
    startTimer();
  });

  closeMemoryBtn.addEventListener("click", () => {
    resetGame();
  });

  /* ================= GAME ================= */

  function resetState() {
    memoryArea.innerHTML = "";
    flippedCards = [];
    matches = 0;
    mistakes = 0;
    timer = 60;
    matchesEl.textContent = matches;
    memoryTimerEl.textContent = `⏳ ${timer}`;
  }

  function setupMemoryGame() {
    const symbols = ["🍎","🍌","🍇","🍓","🍉","🍒","🥝","🍑"];
    cards = [...symbols, ...symbols];
    shuffle(cards);

    cards.forEach(symbol => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.symbol = symbol;
      card.textContent = "";
      card.addEventListener("click", flipCard);
      memoryArea.appendChild(card);
    });
  }

  function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function showCardsBriefly() {
    const allCards = document.querySelectorAll("#memoryArea .card");
    allCards.forEach(card => {
      card.textContent = card.dataset.symbol;
      card.classList.add("flipped");
    });

    setTimeout(() => {
      allCards.forEach(card => {
        card.textContent = "";
        card.classList.remove("flipped");
      });
    }, 3000);
  }

  function flipCard() {
    if (
      flippedCards.length === 2 ||
      this.classList.contains("flipped") ||
      this.classList.contains("matched")
    ) return;

    this.textContent = this.dataset.symbol;
    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 400);
    }
  }

  function checkMatch() {
    const [c1, c2] = flippedCards;

    if (c1.dataset.symbol === c2.dataset.symbol) {
      c1.classList.add("matched");
      c2.classList.add("matched");
      matches++;
      matchesEl.textContent = matches;
    } else {
      c1.textContent = "";
      c2.textContent = "";
      c1.classList.remove("flipped");
      c2.classList.remove("flipped");
      mistakes++;
    }

    flippedCards = [];

    if (matches === cards.length / 2) {
      clearInterval(memoryInterval);
      const finalReward = Math.max(0, BASE_REWARD - mistakes * 2);
      setTimeout(() => showMemoryResult(finalReward), 200);
    }
  }

  function startTimer() {
    clearInterval(memoryInterval);
    memoryInterval = setInterval(() => {
      timer--;
      memoryTimerEl.textContent = `⏳ ${timer}`;

      if (timer <= 0) {
        clearInterval(memoryInterval);
        alert("Час вийшов! Гра завершена.");
        resetGame();
      }
    }, 1000);
  }

  function showMemoryResult(finalReward) {
    let modal = document.getElementById("memoryResultModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "memoryResultModal";
      modal.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,.75);
        display:flex; align-items:center; justify-content:center; z-index:9999;
      `;
      modal.innerHTML = `
        <div class="mdl-result">
          <h2>🎉 Вітаємо!</h2>
          <p></p>
          <button id="closeMemoryResultBtn">OK</button>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.querySelector("p").innerHTML = `Ти заробив <strong>${finalReward}</strong> 💰`;
    modal.style.display = "flex";

    document.getElementById("closeMemoryResultBtn").onclick = () => {
      modal.style.display = "none";
      resetGame();

      if (window.updateBalance) {
        window.updateBalance(finalReward);
      }
    };
  }

  function resetGame() {
    clearInterval(memoryInterval);
    memoryContainer.classList.remove("active");
    resetState();
  }

});
