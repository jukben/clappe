import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import { store } from "./index";
import { CLAP_LIMIT, CLAP_TYPE } from "../constants";

class ClappeContainer extends React.Component {
  isDisabled() {
    const { type } = this.props;

    return type === CLAP_TYPE.DISABLED || store.clapCount >= CLAP_LIMIT;
  }

  superClick = () => {
    const { superClick, node } = this.props;
    superClick(node);
  };

  render() {
    const { type } = this.props;
    return (
      <div
        tabIndex={-1}
        role="button"
        className={classNames("clappe__superClap", {
          "clappe__superClap--disabled": this.isDisabled(),
          "clappe__superClap--left": type === CLAP_TYPE.LEFT,
          "clappe__superClap--footer": type === CLAP_TYPE.FOOTER,
          "clappe__superClap--bar": type === CLAP_TYPE.BAR
        })}
        onClick={this.superClick}
      >
        <span aria-label="make super clap" role="img">
          🎉
        </span>
      </div>
    );
  }
}

export default observer(ClappeContainer);
