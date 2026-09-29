document.addEventListener(
  "DOMContentLoaded",
  () => {

    const overlay =
      document.getElementById(
        "envelope-overlay"
      );

    const wrapper =
      document.getElementById(
        "envelope-wrapper"
      );

    const flap =
      document.getElementById(
        "envelope-flap"
      );

    const main =
      document.getElementById(
        "main-wrapper"
      );

    const audioWidget =
      document.getElementById(
        "audio-widget"
      );

    const audioText =
      document.getElementById(
        "audio-status-text"
      );


    /* =====================================================
       RAZONES
    ====================================================== */

    const loveReasons = [

      "Porque tu sonrisa tiene una manera especial de mejorar mis días.",

      "Porque contigo puedo ser yo mismo.",

      "Porque tus abrazos se sienten como llegar a casa.",

      "Porque hasta los momentos más simples se vuelven especiales cuando estoy contigo.",

      "Porque me encanta escuchar tu risa.",

      "Porque admiro la persona que eres.",

      "Porque contigo aprendí que el amor también está en los pequeños detalles.",

      "Porque cuando pienso en un futuro bonito, muchas veces te imagino a mi lado.",

      "Porque eres una de esas personas que uno agradece haber conocido.",

      "Porque haces que mi corazón tenga una razón más para sonreír.",

      "Porque tu mirada puede decir cosas que ninguna palabra consigue explicar.",

      "Porque contigo puedo compartir mis alegrías y mis días difíciles.",

      "Porque cada recuerdo contigo tiene un lugar especial en mi corazón.",

      "Porque me gusta hacerte sonreír.",

      "Porque tu presencia hace diferentes mis días.",

      "Porque me inspiras a querer ser una mejor versión de mí.",

      "Porque hay momentos en los que simplemente te miro y pienso: qué suerte la mía.",

      "Porque no necesito una ocasión especial para pensar en ti.",

      "Porque eres parte de muchos de mis pensamientos bonitos.",

      "Porque si tuviera que volver a elegir a quién dedicarle esta página, volvería a elegirte a ti.",

      "Porque contigo descubrí que el amor también puede sentirse como tranquilidad.",

      "Porque tus pequeños detalles significan muchísimo para mí.",

      "Porque me encanta la manera en que haces especiales las cosas normales.",

      "Porque tu felicidad también se ha convertido en algo importante para mí.",

      "Porque eres tú. Y eso ya es una razón enorme."

    ];


    /* =====================================================
       ABRIR SOBRE
    ====================================================== */

    let opened = false;

    wrapper.addEventListener(
      "click",
      () => {

        if (opened) return;

        opened = true;


        if (
          window.romanticAudio
        ) {

          window.romanticAudio
            .playMagicChime();

          setTimeout(
            () => {

              window.romanticAudio
                .play();

            },
            700
          );

        }


        // Explosión inicial

        if (
          window.heartParticles
        ) {

          const rect =
            wrapper.getBoundingClientRect();

          const x =
            rect.left +
            rect.width / 2;

          const y =
            rect.top +
            rect.height / 2;


          window.heartParticles
            .triggerBurst(
              x,
              y,
              120
            );


          setTimeout(
            () => {

              window.heartParticles
                .triggerBurst(
                  window.innerWidth * .2,
                  window.innerHeight * .35,
                  70
                );

            },
            250
          );


          setTimeout(
            () => {

              window.heartParticles
                .triggerBurst(
                  window.innerWidth * .8,
                  window.innerHeight * .35,
                  70
                );

            },
            450
          );

        }


        // Abrir solapa

        flap.style.transform =
          "rotateX(180deg)";


        // Carta sube

        setTimeout(
          () => {

            const letter =
              document.querySelector(
                ".envelope-letter"
              );

            if (letter) {

              letter.style.transform =
                "translateY(-65px)";

            }

          },
          400
        );


        // Abrir universo

        setTimeout(
          () => {

            overlay.classList.add(
              "opened"
            );

            main.classList.add(
              "visible"
            );

            document.body.style.overflow =
              "auto";

          },
          1500
        );

      }
    );


    /* =====================================================
       AUDIO
    ====================================================== */

    audioWidget.addEventListener(
      "click",
      () => {

        if (
          !window.romanticAudio
        ) return;


        const playing =
          window.romanticAudio.toggle();


        if (playing) {

          audioWidget.classList
            .remove("paused");

          audioText.textContent =
            "Música: Activada";

        } else {

          audioWidget.classList
            .add("paused");

          audioText.textContent =
            "Música: Pausada";

        }

      }
    );


    /* =====================================================
       FRASCO
    ====================================================== */

    const jar =
      document.getElementById(
        "jar-wrapper"
      );

    const modal =
      document.getElementById(
        "reason-modal"
      );

    const modalNum =
      document.getElementById(
        "modal-num"
      );

    const modalText =
      document.getElementById(
        "modal-text"
      );

    const close =
      document.getElementById(
        "modal-close-btn"
      );

    const modalX =
      document.getElementById(
        "modal-x"
      );


    loveReasons.forEach(
      (reason, index) => {

        const heart =
          document.createElement(
            "div"
          );

        heart.className =
          "jar-heart-btn";

        heart.innerHTML =
          '<i class="fas fa-heart"></i>';


        const positions = [

          [15, 78],
          [30, 68],
          [50, 82],
          [70, 73],
          [80, 86],

          [22, 52],
          [40, 58],
          [60, 50],
          [75, 57],

          [12, 38],
          [30, 34],
          [50, 40],
          [68, 31],
          [86, 40],

          [20, 20],
          [40, 23],
          [60, 17],
          [78, 24],

          [32, 9],
          [50, 13],
          [70, 10],

          [25, 45],
          [55, 65],
          [85, 65],
          [45, 32],
          [65, 43]

        ];


        const pos =
          positions[
          index %
          positions.length
          ];


        heart.style.left =
          pos[0] + "%";

        heart.style.top =
          pos[1] + "%";


        heart.style.animationDelay =
          (index * .13) + "s";


        heart.addEventListener(
          "click",
          e => {

            e.stopPropagation();


            if (
              window.romanticAudio
            ) {

              window.romanticAudio
                .playHeartPop();

            }


            const rect =
              heart.getBoundingClientRect();


            if (
              window.heartParticles
            ) {

              window.heartParticles
                .triggerBurst(
                  rect.left + 20,
                  rect.top + 20,
                  35
                );

            }


            modalNum.textContent =
              `Razón #${index + 1} de mi amor`;


            modalText.textContent =
              `"${reason}"`;


            modal.classList.add(
              "active"
            );

          }
        );


        jar.appendChild(heart);

      }
    );


    function closeModal() {

      modal.classList.remove(
        "active"
      );

    }


    close.addEventListener(
      "click",
      closeModal
    );


    modalX.addEventListener(
      "click",
      closeModal
    );


    modal.addEventListener(
      "click",
      e => {

        if (
          e.target === modal
        ) {

          closeModal();

        }

      }
    );


    /* =====================================================
       LLUVIA DE AMOR
    ====================================================== */

    const burst =
      document.getElementById(
        "burst-love-btn"
      );


    burst.addEventListener(
      "click",
      () => {

        if (
          window.romanticAudio
        ) {

          window.romanticAudio
            .playMagicChime();

        }


        if (
          window.heartParticles
        ) {

          const points = [

            [.15, .25],
            [.30, .45],
            [.50, .22],
            [.70, .42],
            [.85, .25],
            [.20, .70],
            [.50, .60],
            [.80, .70]

          ];


          points.forEach(
            (point, index) => {

              setTimeout(
                () => {

                  window.heartParticles
                    .triggerBurst(
                      window.innerWidth *
                      point[0],

                      window.innerHeight *
                      point[1],

                      90
                    );

                },
                index * 150
              );

            }
          );

        }


        showLoveToast();

      }
    );


    function showLoveToast() {

      const messages = [

        "Te amo, María ❤️",

        "Mi universo tiene tu nombre ✨",

        "Abel ♥ María",

        "Eres mi persona favorita 💕",

        "Gracias por existir 🌹",

        "Qué bonito coincidir contigo ❤️",

        "Siempre habrá un lugar para ti en mi corazón ✨"

      ];


      const toast =
        document.createElement(
          "div"
        );


      toast.className =
        "love-toast-popup";


      toast.textContent =
        messages[
        Math.floor(
          Math.random() *
          messages.length
        )
        ];


      document.body.appendChild(
        toast
      );


      requestAnimationFrame(
        () => {

          toast.classList.add(
            "show"
          );

        }
      );


      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

          setTimeout(
            () => toast.remove(),
            600
          );

        },
        2600
      );

    }


    /* =====================================================
       CORAZÓN FINAL
    ====================================================== */

    const finalButton =
      document.getElementById(
        "final-heart-button"
      );

    const secret =
      document.getElementById(
        "final-secret"
      );


    finalButton.addEventListener(
      "click",
      () => {

        secret.classList.add(
          "show"
        );


        if (
          window.heartParticles
        ) {

          for (
            let i = 0;
            i < 7;
            i++
          ) {

            setTimeout(
              () => {

                window.heartParticles
                  .triggerBurst(
                    window.innerWidth *
                    (.2 +
                      Math.random() *
                      .6),

                    window.innerHeight *
                    (.25 +
                      Math.random() *
                      .45),

                    100
                  );

              },
              i * 250
            );

          }

        }


        if (
          window.romanticAudio
        ) {

          window.romanticAudio
            .playMagicChime();

        }


        showLoveToast();

      }
    );


    /* =====================================================
       EFECTO DE TOQUE
    ====================================================== */

    document.addEventListener(
      "touchstart",
      e => {

        if (!e.touches.length)
          return;


        const x =
          e.touches[0].clientX;

        const y =
          e.touches[0].clientY;


        if (
          window.heartParticles
        ) {

          window.heartParticles
            .triggerBurst(
              x,
              y,
              12
            );

        }

      },
      {
        passive: true
      }
    );

  }
);