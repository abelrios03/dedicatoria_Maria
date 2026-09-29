class RomanticAudio {
  constructor() {
    this.music = new Audio("audio/romantic-song.mp3");
    this.music.loop = true;
    this.music.volume = 0.35;

    this.audioContext = null;
  }

  initializeContext() {
    if (!this.audioContext) {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (AudioContext) {
        this.audioContext = new AudioContext();
      }
    }

    if (
      this.audioContext &&
      this.audioContext.state === "suspended"
    ) {
      this.audioContext.resume();
    }
  }

  play() {
    this.initializeContext();

    return this.music.play().catch(() => {
      return false;
    });
  }

  pause() {
    this.music.pause();
  }

  toggle() {
    this.initializeContext();

    if (this.music.paused) {
      this.music.play().catch(() => { });
      return true;
    }

    this.music.pause();
    return false;
  }

  playTone(frequency, duration, type = "sine") {
    this.initializeContext();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
      0.0001,
      this.audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.12,
      this.audioContext.currentTime + 0.03
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      this.audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playMagicChime() {
    this.playTone(523.25, 0.35, "sine");

    setTimeout(() => {
      this.playTone(659.25, 0.35, "sine");
    }, 100);

    setTimeout(() => {
      this.playTone(783.99, 0.45, "sine");
    }, 200);
  }

  playHeartPop() {
    this.playTone(420, 0.12, "triangle");

    setTimeout(() => {
      this.playTone(620, 0.18, "triangle");
    }, 50);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.romanticAudio = new RomanticAudio();
});