import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import classNames from 'classnames';
import { store } from './index';
import { CLAP_LIMIT, CLAP_TYPE } from './constants';

class ClappeContainer extends React.Component {
  constructor() {
    super();

    this.superClick = this.superClick.bind(this);
  }

  isDisabled() {
    const { type } = this.props;

    return type === CLAP_TYPE.DISABLED || store.clapCount >= CLAP_LIMIT;
  }

  superClick() {
    const { superClick, node } = this.props;
    superClick(node);
  }

  render() {
    const { type } = this.props;
    return (
      <div
        className={classNames('clappe', {
          'clappe--disabled': this.isDisabled(),
          'clappe--left': type === CLAP_TYPE.LEFT,
          'clappe--footer': type === CLAP_TYPE.FOOTER,
          'clappe--bar': type === CLAP_TYPE.BAR,
        })}
      >
        <div className={'clappe__superClap'} onClick={this.superClick}>
          🎉
        </div>
      </div>
    );
  }
}

export default observer(ClappeContainer);
