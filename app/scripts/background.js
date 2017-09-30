// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import { Howl } from 'howler';
import { CLAP_SOUND } from './Clappe/constants';

let soundsAvailable = true;

chrome.storage.onChanged.addListener(({ sounds }) => {
  if (!sounds) return;

  soundsAvailable = sounds.newValue;
});

chrome.storage.sync.get(
  {
    sounds: false,
  },
  ({ sounds }) => (soundsAvailable = sounds)
);

const SOUNDS = {
  [CLAP_SOUND.NORMAL]: new Howl({
    src: [chrome.runtime.getURL('sounds/clap.mp3')],
  }),
  [CLAP_SOUND.SUPER]: new Howl({
    src: [chrome.runtime.getURL('sounds/superClap.mp3')],
  }),
};

chrome.runtime.onMessage.addListener(({ sound }) => {
  soundsAvailable && SOUNDS[sound].play();
});

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.tabs.onUpdated.addListener(tabId => {
  chrome.pageAction.show(tabId);
});

console.log(`'Allo 'Allo! Event Page for Page Action`);
