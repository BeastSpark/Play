window.addEventListener("DOMContentLoaded", () => {
  const avatarImg = document.getElementById("avatar");
  const avatarModal = document.getElementById("avatarModal");
  const changeBtn = document.getElementById("changeAvatarBtn");
  const closeModal = document.querySelector(".close");

  // Завантаження аватара з localStorage
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) {
    avatarImg.src = savedAvatar;
  }

  // Завантаження прогресу квестів
  let completedQuests = JSON.parse(localStorage.getItem("completedQuests") || "[]");

  // Функція завершення квеста
  function completeQuest(id) {
    if (!completedQuests.includes(id)) {
      completedQuests.push(id);
      localStorage.setItem("completedQuests", JSON.stringify(completedQuests));
    }
    unlockAvatars();
  }

  // Розблокування аватарів
  function unlockAvatars() {
    document.querySelectorAll(".avatar-option").forEach(img => {
      const questId = parseInt(img.dataset.id);
      if (completedQuests.includes(questId)) {
        img.classList.remove("locked");
        img.style.pointerEvents = "auto";
      }
    });
  }
  unlockAvatars();

  // Відкрити модалку
  changeBtn.addEventListener("click", () => {
    avatarModal.style.display = "flex";
    setTimeout(() => avatarModal.classList.add("show"), 10);
  });

  // Закрити модалку
  closeModal.addEventListener("click", () => {
    avatarModal.classList.remove("show");
    setTimeout(() => avatarModal.style.display = "none", 300);
  });

  // Вибір аватара
  document.querySelectorAll(".avatar-option").forEach(img => {
    img.addEventListener("click", () => {
      if (!img.classList.contains("locked")) {
        avatarImg.src = img.src;
        localStorage.setItem("avatar", img.src);
        avatarModal.classList.remove("show");
        setTimeout(() => avatarModal.style.display = "none", 300);
      }
    });
  });
});
