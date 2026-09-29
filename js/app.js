document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("envelope-overlay");
  const wrapper = document.getElementById("envelope-wrapper");
  const flap = document.getElementById("envelope-flap");
  const main = document.getElementById("main-wrapper");

  const audioWidget = document.getElementById("audio-widget");
  const audioText = document.getElementById("audio-status-text");

  const modal = document.getElementById("reason-modal");
  const modalNum = document.getElementById("modal-num");
  const modalText = document.getElementById("modal-text");
  const modalClose = document.getElementById("modal-close-btn");
  const modalX = document.getElementById("modal-x");

  const finalButton = document.getElementById("final-heart-button");
  const finalSecret = document.getElementById("final-secret");
  const toast = document.getElementById("love-toast");

  let opened = false;

  document.body.style.overflow = "hidden";

  wrapper.addEventListener("click", () => {
    if (opened) return;

    opened = true;
    wrapper.classList.add("opening");

    if (window.romanticAudio) {
      window.romanticAudio.playMagicChime();

      setTimeout(() => {
        window.romanticAudio.play();
      }, 700);
    }

    if (window.heartParticles) {
      const rect = wrapper.getBoundingClientRect();

      window.heartParticles.triggerBurst(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        110
      );
    }

    flap.style.transform = "rotateX(180deg)";

    setTimeout(() => {
      const letter = document.querySelector(".envelope-letter");

      if (letter) {
        letter.style.transform = "translateX(-50%) translateY(-65px)";
      }
    }, 400);

    setTimeout(() => {
      overlay.classList.add("opened");
      main.classList.add("visible");
      document.body.style.overflow = "auto";
    }, 1500);
  });

  audioWidget.addEventListener("click", () => {
    if (!window.romanticAudio) return;

    const playing = window.romanticAudio.toggle();

    audioWidget.classList.toggle("paused", !playing);
    audioText.textContent = playing
      ? "Música activada"
      : "Música pausada";
  });

  const interactiveHearts = document.querySelectorAll(
    ".love-word-heart, .mini-interactive-heart"
  );

  interactiveHearts.forEach((heart) => {
    heart.addEventListener("click", (event) => {
      const number = heart.dataset.number || "01";
      const message = heart.dataset.message || "Te amo, María. ❤️";

      modalNum.textContent = `Una parte de mi corazón · ${number}`;
      modalText.textContent = `“${message}”`;
      modal.classList.add("active");

      heart.classList.remove("heart-clicked");
      void heart.offsetWidth;
      heart.classList.add("heart-clicked");

      createLoveBurst(event.clientX, event.clientY);
    });
  });

  function closeModal() {
    modal.classList.remove("active");
  }

  modalClose.addEventListener("click", closeModal);
  modalX.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  finalButton.addEventListener("click", () => {
    finalSecret.classList.add("show");

    if (window.heartParticles) {
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          window.heartParticles.triggerBurst(
            window.innerWidth * (0.2 + Math.random() * 0.6),
            window.innerHeight * (0.25 + Math.random() * 0.45),
            75
          );
        }, i * 250);
      }
    }

    if (window.romanticAudio) {
      window.romanticAudio.playMagicChime();
    }

    showLoveToast("Te amo, María ❤️");
  });

  function createLoveBurst(x, y) {
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("span");

      heart.className = "love-floating-heart";
      heart.textContent = Math.random() > 0.25 ? "♥" : "✦";
      heart.style.left = `${x}px`;
      heart.style.top = `${y}px`;

      heart.style.setProperty(
        "--heart-x",
        `${(Math.random() - 0.5) * 180}px`
      );

      heart.style.setProperty(
        "--heart-rotate",
        `${(Math.random() - 0.5) * 90}deg`
      );

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 2200);
    }
  }

  function showLoveToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
});