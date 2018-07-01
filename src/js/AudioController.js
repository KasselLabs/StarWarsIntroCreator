class AudioController {
  constructor() {
    this.audio = document.querySelector('#themeAudio');
    this.isLoaded = false;

    if (!this.audio) {
      return;
    }

    this.audioLoadPromise = new Promise((resolve) => {
      this.audio.oncanplaythrough = () => resolve();
    });

    this.audio.load();
  }

  loadAudio() {
    if (!this.isLoaded && this.audio) {
      this.audio.load();
      this.isLoaded = true;
    }
  }

  canPlay() {
    return this.audioLoadPromise;
  }

  play() {
    if (!this.audio) {
      return null;
    }

    return new Promise(async (resolve, reject) => {
      // this.audio.currentTime = 92;
      // this.audio.playbackRate = 3;
      this.reset();
      try {
        await this.audio.play();
      } catch (error) {
        reject(error);
        return;
      }

      const endedListener = () => {
        resolve();
      };
      this.audio.addEventListener('ended', endedListener);
    });
  }

  reset() {
    if (!this.audio) {
      return;
    }
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

export default new AudioController();
