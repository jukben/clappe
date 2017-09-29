import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import classNames from 'classnames';
import { store } from './index';

class ClappeContainer extends React.Component {
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

    store.addSuperClap();
  }

  isDisabled() {
    return store.clapCount >= 50;
  }

  render() {
    console.log(toJS(store));

    return (
      <div
        className={classNames('clappe', {
          'clappe--disabled': this.isDisabled(),
        })}
      >
        <div className={'clappe__superClap'} onClick={this.makeParty}>
          🎉
        </div>
      </div>
    );
  }
}

export default observer(ClappeContainer);
