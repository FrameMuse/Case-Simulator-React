/*
** StandoffCase  Copyright (C) 2020  sunaiclub
** Full License is in the root directory
*/


export type SoundName = "cases" | "contract" | "getItem" | "roulette" | "wheelItem" | "notice" | "upgrade" | "rouletteBattle" | "getItemBattle"

export class AudioTools {
  private static options = {
    volume: 0.25 as (0 | 1)
  }

  public static set volume(value: 0 | 1) {
    this.options.volume = value
  }

  public static get volume() {
    return this.options.volume
  }

  // public static playAudioContext(url: string) {
  //   // Check if the browser supports web audio. Safari wants a prefix.
  //   if ('AudioContext' in window || 'webkitAudioContext' in window) {

  //     //////////////////////////////////////////////////
  //     // Here's the part for just playing an audio file.
  //     //////////////////////////////////////////////////
  //     function play(audioBuffer: AudioBuffer) {
  //       const source = context.createBufferSource();
  //       source.buffer = audioBuffer;
  //       source.connect(context.destination);
  //       source.start();
  //     };

  //     const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  //     const context = new AudioContext();
  //     const gainNode = context.createGain();
  //     gainNode.gain.value = 1; // set volume to 100%
  //     var playButton = document.querySelector('#play');
  //     let yodelBuffer = void 0;

  //     // The Promise-based syntax for BaseAudioContext.decodeAudioData() is not supported in Safari(Webkit).
  //     window
  //       .fetch(url)
  //       .then(response => response.arrayBuffer())
  //       .then(arrayBuffer => context.decodeAudioData(arrayBuffer);
  //       // .then()


  //     //////////////////////////////////////////////////
  //     // Here's the part for unlocking the audio context, probably for iOS only
  //     //////////////////////////////////////////////////

  //     // From https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
  //     // "The only way to unmute the Web Audio context is to call noteOn() right after a user interaction. This can be a click or any of the touch events (AFAIK – I only tested click and touchstart)."

  //     var unmute = document.getElementById('unmute');
  //     unmute.addEventListener('click', unlock);

  //     function unlock() {
  //       console.log("unlocking")
  //       // create empty buffer and play it
  //       var buffer = context.createBuffer(1, 1, 22050);
  //       var source = context.createBufferSource();
  //       source.buffer = buffer;
  //       source.connect(context.destination);

  //       // play the file. noteOn is the older version of start()
  //       source.start ? source.start(0) : source.noteOn(0);

  //       // by checking the play state after some time, we know if we're really unlocked
  //       setTimeout(function() {
  //         if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
  //           // Hide the unmute button if the context is unlocked.
  //           unmute.style.display = "none";
  //         }
  //       }, 0);
  //     }

  //     // Try to unlock, so the unmute is hidden when not necessary (in most browsers).
  //     unlock();
  //   }
  // }
}

class SoundController extends AudioTools {
  private static soundExt = ".mp3"
  private static pathname = "/assets/sounds/"
  private static soundsRef = new Map<SoundName, HTMLAudioElement>()

  private static getSoundPath(name: SoundName) {
    return this.pathname + name + this.soundExt
  }

  private static getSoundRef(name: SoundName, forceCreate?: boolean) {
    if (!this.soundsRef.has(name) || forceCreate) {
      this.createSoundRef(name)
    }

    return this.soundsRef.get(name)
  }

  private static createSoundRef(name: SoundName) {
    const soundPath = this.getSoundPath(name)
    const soundRef = new Audio(soundPath)
    // // Safari fix
    // soundRef.src = soundPath
    this.soundsRef.set(name, soundRef)
  }

  public static play(name: SoundName, canBeInterupted?: boolean) {
    const soundRef = this.getSoundRef(name, canBeInterupted)

    if (!soundRef) {
      throw new Error("Couldn't create audio element")
    }
    if (!soundRef.canPlayType("audio/mp3")) {
      throw new Error("Can't play this audio type")
    }

    soundRef.onsecuritypolicyviolation = () => {
      throw new Error("Security Policy Violation - SPV")
    }

    return new Promise(resolve => {
      soundRef.onplay = resolve
      soundRef.play().catch(resolve)
    })
  }

  public static pause(name: SoundName) {
    const soundRef = this.getSoundRef(name)

    soundRef?.pause()
  }
}

export default SoundController
