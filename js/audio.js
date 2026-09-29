class RomanticAudio {

  constructor() {

    this.audio =
      new Audio("assets/musica.mp3");

    this.audio.loop = true;

    this.audio.volume = 0.35;

    this.playing = false;


    // Sonidos cortos usando Web Audio

    this.audioContext = null;
  }


  initContext() {

    if (!this.audioContext) {

      this.audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

    }

    if (
      this.audioContext.state ===
      "suspended"
    ) {

      this.audioContext.resume();

    }

  }


  play() {

    this.initContext();

    this.audio
      .play()
      .then(() => {

        this.playing = true;

      })
      .catch(() => {

        console.log(
          "El navegador requiere interacción del usuario para reproducir música."
        );

      });

  }


  pause() {

    this.audio.pause();

    this.playing = false;
  }


  toggle() {

    if (this.playing) {

      this.pause();

      return false;

    } else {

      this.play();

      return true;

    }

  }


  playMagicChime() {

    this.initContext();

    const ctx =
      this.audioContext;

    const now =
      ctx.currentTime;


    const frequencies = [
      523.25,
      659.25,
      783.99,
      1046.50
    ];


    frequencies.forEach(
      (frequency, index) => {

        const oscillator =
          ctx.createOscillator();

        const gain =
          ctx.createGain();


        oscillator.type =
          "sine";


        oscillator.frequency.value =
          frequency;


        gain.gain.setValueAtTime(
          0,
          now + index * .08
        );


        gain.gain.linearRampToValueAtTime(
          .12,
          now +
          index * .08 +
          .03
        );


        gain.gain.exponentialRampToValueAtTime(
          .001,
          now +
          index * .08 +
          .8
        );


        oscillator.connect(gain);

        gain.connect(ctx.destination);


        oscillator.start(
          now + index * .08
        );


        oscillator.stop(
          now +
          index * .08 +
          .9
        );

      }
    );

  }


  playHeartPop() {

    this.initContext();

    const ctx =
      this.audioContext;

    const now =
      ctx.currentTime;


    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.setValueAtTime(
      600,
      now
    );


    oscillator.frequency.exponentialRampToValueAtTime(
      950,
      now + .12
    );


    gain.gain.setValueAtTime(
      .12,
      now
    );


    gain.gain.exponentialRampToValueAtTime(
      .001,
      now + .2
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start(now);

    oscillator.stop(
      now + .25
    );

  }

}


window.addEventListener(
  "DOMContentLoaded",
  () => {

    window.romanticAudio =
      new RomanticAudio();

  }
);