// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';

import React from 'react';
import ReactDOM from 'react-dom';

class Options extends React.Component {
  constructor() {
    super();

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.state = {
      sounds: false,
    };
  }

  componentDidMount() {
    chrome.storage.sync.get(
      {
        sounds: true,
      },
      ({ sounds }) => {
        this.setState({ sounds });
      }
    );
  }

  toggleCheckbox(e) {
    const newSounds = e.target.checked;
    const { sounds } = this.state;

    this.setState({
      sounds: newSounds,
    });

    chrome.storage.sync.set({
      sounds: newSounds,
    });
  }

  render() {
    const { sounds } = this.state;

    return (
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
    );
  }
}

ReactDOM.render(<Options />, document.getElementById('options'));
