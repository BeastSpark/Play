document.addEventListener("DOMContentLoaded", () => {
  const openCasino = document.getElementById("openCasino");
  const modal = document.getElementById("casinoModal");
  const closeCasino = document.getElementById("closeCasino");
  const spinBtn = document.getElementById("spinBtn");
  const resultText = document.getElementById("resultText");

  const slot1 = document.getElementById("slot1");
  const slot2 = document.getElementById("slot2");
  const slot3 = document.getElementById("slot3");

  const slots = ["🍒","🍋","🍇","🍊","⭐","💎"];
  const SPIN_COST = 250;
  const WIN_REWARD = 500;

  openCasino.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeCasino.addEventListener("click", () => {
    modal.style.display = "none";
  });

  spinBtn.addEventListener("click", () => {
    if (!window.updateBalance) {
      console.error("updateBalance not found");
      return;
    }

    // отримаємо баланс через updateBalance(0)
    const currentBalance = window.updateBalance(0);

    if (currentBalance < SPIN_COST) {
      resultText.textContent = "❌ Недостатньо валюти!";
      return;
    }

    // списання
    window.updateBalance(-SPIN_COST);

    const s1 = slots[Math.floor(Math.random() * slots.length)];
    const s2 = slots[Math.floor(Math.random() * slots.length)];
    const s3 = slots[Math.floor(Math.random() * slots.length)];

    slot1.textContent = s1;
    slot2.textContent = s2;
    slot3.textContent = s3;

    if (s1 === s2 && s2 === s3) {
      resultText.textContent = `🎉 Виграш! +${WIN_REWARD}`;
      window.updateBalance(WIN_REWARD);
    } 
    else if (s1 === s2 || s2 === s3 || s1 === s3) {
      resultText.textContent = "👌 Два співпали";
    } 
    else {
      resultText.textContent = "😢 Не пощастило";
    }
  });
});
