// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import { Howl } from 'howler';
import { CLAP_SOUND, CLAP_DEFAULT_SETTINGS } from './Clappe/constants';
import { getNewSettings } from './Clappe/helpers';

let settings = { ...CLAP_DEFAULT_SETTINGS };

chrome.storage.onChanged.addListener(changes => {
  settings = { ...settings, ...getNewSettings(changes) };
});

chrome.storage.sync.get(
  {
    sounds: true,
  },
  cloudSettings => {
    settings = { ...settings, ...cloudSettings };
  }
);

chrome.storage.local.get(
  {
    clap: null,
    superClap: null,
  },
  localSettings => {
    settings = { ...settings, ...localSettings };
  }
);

const playSound = type => {
  const defaultSounds = {
    [CLAP_SOUND.NORMAL]: chrome.runtime.getURL('sounds/clap.mp3'),
    [CLAP_SOUND.SUPER]: chrome.runtime.getURL('sounds/superClap.mp3'),
  };

  console.log(settings[type] || defaultSounds[type]);
  new Howl({
    src: settings[type] || defaultSounds[type],
  }).play();
};

chrome.runtime.onMessage.addListener(({ sound }) => {
  if (settings.sounds) playSound(sound);
});
