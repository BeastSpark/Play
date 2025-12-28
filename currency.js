document.addEventListener("DOMContentLoaded", () => {
  const balanceEl = document.getElementById("balance");

  let balance = 0;
  const saved = localStorage.getItem("balance");

  if (saved !== null && !isNaN(saved)) {
    balance = Math.floor(Number(saved));
  }

  // показуємо баланс
  if (balanceEl) balanceEl.textContent = balance;

  // єдина глобальна функція зміни валюти
  window.updateBalance = function (amount = 0) {
    amount = Math.floor(amount);
    if (isNaN(amount)) return balance;

    balance += amount;
    localStorage.setItem("balance", String(balance));

    if (balanceEl) balanceEl.textContent = balance;

    // синхронізуємо інші елементи, якщо вони є
    const other = document.querySelector(".valuta-wrapper span");
    if (other) other.textContent = balance.toLocaleString("en").replace(/,/g, ".");

    return balance;
  };
});
