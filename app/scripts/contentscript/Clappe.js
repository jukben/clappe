import React from 'react';

export default class Clappe extends React.Component {
  constructor(props) {
    super(props);

    this.makeParty = this.makeParty.bind(this);
  }

  makeParty() {
    const { dataPostId, userId, xsfrToken } = this.props;
    fetch(`https://medium.com/_/api/posts/${dataPostId}/claps`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'x-xsrf-token': xsfrToken,
        'x-obvious-cid': 'web',
        'content-type': 'application/json',
        accept: 'application/json',
        'x-client-date': new Date().getTime(),
      }),
      body: JSON.stringify({
        clapIncrement: 50,
        userId,
      }),
    });
  }

  render() {
    return (
      <div className={'clappe'}>
        <div className={'clappe__superClap'} onClick={this.makeParty}>
          🎉
        </div>
      </div>
    );
  }
}
