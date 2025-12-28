document.addEventListener('DOMContentLoaded', () => {
  const balanceSpan = document.getElementById('balance');
  const buyButton = document.querySelector('.shop .gift-card button');
  const priceElement = document.querySelector('.gift-card h3');
  const specialCard = document.querySelector('.gift-card.special');

  if (!balanceSpan || !buyButton || !priceElement) {
    console.error('Не знайдено елемент балансу, кнопки купити або ціни');
    return;
  }

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function parseNumber(str) {
    return parseInt(str.replace(/\./g, '')) || 0;
  }

  function updateBalanceDisplay() {
    const currentBalance = parseNumber(localStorage.getItem('balance')) || 0;
    balanceSpan.textContent = formatNumber(currentBalance);
  }

  // --- Ціна з урахуванням знижки ---
  let basePrice = 35000;
  let discountedPrice = 28000;
  let discountActive = localStorage.getItem('discountActive') === 'true';

  let currentPrice = discountActive ? discountedPrice : basePrice;
  priceElement.innerHTML = `Ціна: ${formatNumber(currentPrice)} <img src="logos/BeastShine.png" width="20">`;

  updateBalanceDisplay();

  // --- Перевірка наявності секретної картки ---
  if (specialCard) {
    let unlocked = localStorage.getItem('specialUnlocked') === 'true';
    if (unlocked) {
      specialCard.style.display = 'block'; // показуємо картку
    } else {
      specialCard.style.display = 'none'; // ховаємо, якщо нема коду
    }
  }

  buyButton.addEventListener('click', () => {
    let currentBalance = parseNumber(localStorage.getItem('balance')) || 0;

    if (currentBalance >= currentPrice) {
      currentBalance -= currentPrice;
      localStorage.setItem('balance', currentBalance);
      updateBalanceDisplay();

      alert(`🛒 Товар куплено! З балансу знято ${formatNumber(currentPrice)} BeastShines.`);

      window.location.href = 'https://beastspark.github.io/Giveaway/'; // перенаправлення на сторінку отримання
    } else {
      alert("⚠️ У вас недостатньо BeastShines для покупки!");
    }
  });
});
