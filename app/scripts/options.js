// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import React from 'react';
import ReactDOM from 'react-dom';

import { CLAP_DEFAULT_SETTINGS } from './Clappe/constants';
import { getNewSettings } from './Clappe/helpers';

class Options extends React.Component {
  constructor() {
    super();

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = { ...CLAP_DEFAULT_SETTINGS };
  }

  componentDidMount() {
    // sync storage
    chrome.storage.sync.get(
      {
        sounds: true,
      },
      settings => this.setState({ ...settings })
    );

    // local storage
    chrome.storage.local.get(
      {
        clap: null,
        superClap: null,
      },
      settings => this.setState({ ...settings })
    );

    chrome.storage.onChanged.addListener(this.updateState);
  }

  updateState = objects => this.setState({ ...getNewSettings(objects) });

  toggleCheckbox = e => {
    const sounds = e.target.checked;

    chrome.storage.sync.set({
      sounds,
    });
  };

  soundUpload = placeholder => e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      chrome.storage.local.set({
        [placeholder]: reader.result,
      });
    };
  };

  removeSound = placeholder => e => {
    chrome.storage.local.set({
      [placeholder]: null,
    });
  };

  render() {
    const { sounds, clap, superClap } = this.state;

    return (
      <div>
        <h2>Misc</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={sounds}
              onChange={this.toggleCheckbox}
            />
            {` Play sounds of clapping 🔊`}
          </label>
        </div>
        <h2>Custom sounds</h2>
        <div>
          {clap ? (
            <button onClick={this.removeSound('clap')}>Remove</button>
          ) : (
            <input
              type="file"
              onChange={this.soundUpload('clap')}
              accept=".mp3, .waw"
            />
          )}
        </div>
        <div>
          {superClap ? (
            <button onClick={this.removeSound('superClap')}>Remove</button>
          ) : (
            <input
              type="file"
              onChange={this.soundUpload('superClap')}
              accept=".mp3, .waw"
            />
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Options />, document.getElementById('options'));
