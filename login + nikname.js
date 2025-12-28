document.addEventListener('DOMContentLoaded', function () {
  const readyButton = document.querySelector('.close');

  if (readyButton) {
    readyButton.addEventListener('click', function () {
      const inputs = document.querySelectorAll('.register-sec input');
      const nickname = inputs[0].value.trim();
      const password = inputs[1].value;

      if (!nickname || !password) {
        alert('Будь ласка, заповніть всі поля.');
        return; // ⛔ Нічого далі не виконується
      }

      // ✅ Зберігаємо в localStorage
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('password', password);

      // ✅ Виводимо нік на сторінку
      const output = document.getElementById('output');
      if (output) {
        output.innerHTML = `${nickname}`;
      }

      // ✅ Приховуємо модалку
      const modal = document.getElementById('modal_container');
      if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          modal.style.visibility = 'hidden';
        }, 300);
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal_container');
  const output = document.getElementById('output');

  const savedNickname = localStorage.getItem('nickname');

  if (savedNickname) {
    // 👤 Якщо користувач уже вводив ім’я
    if (modal) {
      modal.style.visibility = 'hidden';
      modal.style.opacity = '0';
      modal.style.transform = 'translateY(-20px)';
    }

    if (output) {
      output.innerHTML = `${savedNickname}`;
    }
  }
});
