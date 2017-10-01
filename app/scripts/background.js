// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import { Howl } from 'howler';
import {
  CLAP_SOUND,
  CLAP_DEFAULT_SETTINGS,
  CLAP_SYNC_SETTINGS,
  CLAP_LOCAL_SETTINGS,
} from './constants';
import { getNewSettings } from './helpers';

let settings = { ...CLAP_DEFAULT_SETTINGS };

const updateSettings = newSettings => {
  settings = { ...settings, ...newSettings };
};

chrome.storage.onChanged.addListener(changes => {
  updateSettings(getNewSettings(changes));
});

chrome.storage.sync.get(CLAP_SYNC_SETTINGS, updateSettings);
chrome.storage.local.get(CLAP_LOCAL_SETTINGS, updateSettings);

const playSound = type => {
  const defaultSounds = {
    [CLAP_SOUND.NORMAL]: chrome.runtime.getURL('sounds/clap.mp3'),
    [CLAP_SOUND.SUPER]: chrome.runtime.getURL('sounds/superClap.mp3'),
  };

  new Howl({
    src: settings[type] || defaultSounds[type],
  }).play();
};

chrome.runtime.onMessage.addListener(({ sound }) => {
  if (settings.sounds) playSound(sound);
});
