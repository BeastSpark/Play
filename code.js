document.addEventListener('DOMContentLoaded', function () {

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const balanceSpan = document.querySelector('.valuta-wrapper span');
  const stored = localStorage.getItem("balance");
  const startBalance = stored && !isNaN(stored) ? Number(stored) : 0;

  if (balanceSpan) balanceSpan.textContent = formatNumber(startBalance);

  const openButton = document.getElementById('CODES');
  if (openButton) {
    openButton.addEventListener('click', function () {
      const modal = document.getElementById('code_container');
      if (modal) {
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
      }
    });
  }

  const closeButton = document.querySelector('.close-code');
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      const modal = document.getElementById('code_container');
      if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          modal.style.visibility = 'hidden';
        }, 300);
      }
    });
  }

  const readyButton = document.querySelector('.ready-code');
  if (!readyButton) return;

  readyButton.addEventListener('click', function () {
    const modal = document.getElementById('code_container');
    const input = modal.querySelector('input');
    const code = input.value.trim().replace(/\s+/g, '');

    const validCodes = {
      'TROLL': 1,
      'ThankYouFor500KUsers': 3500,
      'abc': 35000,
      'HoHoHo': 2500,
      'HappyNewYear': 2000,
      'FreeSantaGift': 2000,
      'WINTERSALE_20%': 'discount',
      'CASSINO_FOREVER': 2500,
      'RBX7X-9M2LT-VQ4HZ': 'specialItem'
    };

    const usedCodes = JSON.parse(localStorage.getItem('usedCodes')) || [];

    if (!validCodes.hasOwnProperty(code)) {
      alert('Невірний код.');
      return;
    }

    if (usedCodes.includes(code)) {
      alert('⚠️ Цей код вже був використаний!');
      return;
    }

    const reward = validCodes[code];

    if (reward === 'discount') {
      localStorage.setItem('discountActive', 'true');
      alert("✅ Код прийнято! Ви отримали знижку -20% на покупку 🎉");
      location.reload();
    }
    else if (reward === 'specialItem') {
      localStorage.setItem('specialUnlocked', 'true');
      alert("🎁 Код прийнято! Ви відкрили спеціальний товар у магазині 🔥");
      location.reload();
    }
    else {
      if (window.updateBalance) {
        const newBalance = window.updateBalance(reward);
        if (balanceSpan) balanceSpan.textContent = formatNumber(newBalance);
      }
      alert(`✅ Код прийнято! Ви отримали ${formatNumber(reward)} BeastShines.`);
    }

    usedCodes.push(code);
    localStorage.setItem('usedCodes', JSON.stringify(usedCodes));

    modal.style.opacity = '0';
    modal.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      modal.style.visibility = 'hidden';
      input.value = '';
    }, 300);
  });
});
