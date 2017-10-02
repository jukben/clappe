import 'chromereload/devonly'; // eslint-disable-line

import React from 'react';
import ReactDOM from 'react-dom';

import {
  CLAP_DEFAULT_SETTINGS,
  CLAP_LOCAL_SETTINGS,
  CLAP_SYNC_SETTINGS,
} from './constants';
import { getNewSettings } from './helpers';

class File extends React.PureComponent {
  removeSound = () => this.props.removeSound(this.props.id);

  soundUpload = e => this.props.soundUpload(this.props.id)(e);

  render() {
    const { id, name, file } = this.props;

    return (
      <div className="settings__file">
        <span>{name}</span>
        {file ? (
          <button onClick={this.removeSound}>Reset to default</button>
        ) : (
          <div>
            <input
              id={id}
              type="file"
              onChange={this.soundUpload}
              accept=".mp3, .waw"
            />
            <label htmlFor={id}>Select file</label>
          </div>
        )}
      </div>
    );
  }
}

class Options extends React.Component {
  constructor() {
    super();

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = { ...CLAP_DEFAULT_SETTINGS };
  }

  componentDidMount() {
    const setDefaultState = settings => this.setState({ ...settings });
    chrome.storage.onChanged.addListener(this.updateState);

    // sync storage
    chrome.storage.sync.get(CLAP_SYNC_SETTINGS, setDefaultState);

    // local storage
    chrome.storage.local.get(CLAP_LOCAL_SETTINGS, setDefaultState);
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

  removeSound = placeholder => {
    chrome.storage.local.set({
      [placeholder]: null,
    });
  };

  render() {
    const { sounds, clap, superClap } = this.state;

    return (
      <div className="settings">
        <h2>Misc</h2>
        <div className="settings__item">
          <label htmlFor={'sounds'}>
            <input
              id="sounds"
              type="checkbox"
              checked={sounds}
              onChange={this.toggleCheckbox}
            />
            {` Play sounds of clapping 🔊`}
          </label>
        </div>
        <h2>Custom sounds</h2>
        {[
          {
            name: 'Clap',
            id: 'clap',
            file: clap,
          },
          {
            name: 'Super clap',
            id: 'superClap',
            file: superClap,
          },
        ].map(({ name, id, file }) => (
          <div key={id} className="settings__item">
            <File
              name={name}
              id={id}
              file={file}
              removeSound={this.removeSound}
              soundUpload={this.soundUpload}
            />
          </div>
        ))}
        <footer>
          {'Built with ❤️ by '}
          <a href="https://jukben.cz">jukben</a>
          {'. Licensed under MIT. Code on '}
          <a href="https://github.com/jukben/clappe">GitHub</a>.
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<Options />, document.getElementById('options'));
