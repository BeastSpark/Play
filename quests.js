// === OPEN/CLOSE MODAL ===
const questsBtn = document.querySelector(".quests-btn");
const questsModal = document.getElementById("questsModal");
const closeModal = document.getElementById("closeModal");

questsBtn.addEventListener("click", () => {
  questsModal.style.display = "flex";
});
closeModal.addEventListener("click", () => {
  questsModal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === questsModal) questsModal.style.display = "none";
});


document.addEventListener("DOMContentLoaded", () => {
  let quests = JSON.parse(localStorage.getItem("quests")) || {
    quest1: { done: false, active: false, startTime: null },
    quest2: { done: false, active: false },
    quest3: { done: false, active: false },
    quest4: { done: false, active: false }
  };

  function saveQuests() {
    localStorage.setItem("quests", JSON.stringify(quests));
  }

  function updateQuestUI() {
    document.querySelectorAll(".quests-content li").forEach((li) => {
      const questKey = li.getAttribute("data-quest");
      const statusEl = li.querySelector(".status");
      const hintEl = li.querySelector(".hint");
      const btn = li.querySelector(".take-quest");

      if (quests[questKey].done) {
        statusEl.textContent = "✅";
        statusEl.style.color = "lime";
        btn.style.display = "none";
        hintEl.textContent = "Завдання виконано!";
      } else if (quests[questKey].active) {
        statusEl.textContent = "🔄";
        statusEl.style.color = "yellow";
        btn.style.display = "none";
      } else {
        statusEl.textContent = "⏳";
        statusEl.style.color = "#feca57";
        btn.style.display = "inline-block";
        hintEl.textContent = "";
      }
    });
  }

  // Таймер для підказки
  let quest1Interval = null;

  function startQuest1() {
    quests.quest1.active = true;
    quests.quest1.startTime = Date.now();
    saveQuests();
    updateQuestUI();

    quest1Interval = setInterval(() => {
      if (quests.quest1.done) {
        clearInterval(quest1Interval);
        return;
      }

      const li = document.querySelector('[data-quest="quest1"]');
      if (!li) return;
      const hintEl = li.querySelector(".hint");

      let remain = 600 - Math.floor((Date.now() - quests.quest1.startTime) / 1000);
      if (remain > 0) {
        hintEl.textContent = `Залишилось: ${Math.floor(remain/60)}хв ${remain%60}с`;
      } else {
        clearInterval(quest1Interval);

        quests.quest1.done = true;
        quests.quest1.active = false;
        saveQuests();

        if (window.updateBalance) {
          window.updateBalance(1000);
        }
        let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
        inventory.push("quest1-avatar.png");
        localStorage.setItem("inventory", JSON.stringify(inventory));

        updateQuestUI();
        alert("🎉 Ви виконали квест: пробути на сайті 10 хвилин!\n+1000 валюти + іконка 🏆");
      }
    }, 1000);
  }

  // Кнопки "Взяти"
  document.querySelectorAll(".take-quest").forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.closest("li");
      const questKey = li.getAttribute("data-quest");
      if (questKey === "quest1" && !quests.quest1.active && !quests.quest1.done) {
        startQuest1();
      }
    });
  });

  // Якщо був активний — підняти таймер знову після перезавантаження
  if (quests.quest1.active && !quests.quest1.done) {
    startQuest1();
  } else {
    updateQuestUI();
  }
});
