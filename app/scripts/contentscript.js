// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import ReactDOM from 'react-dom';
import Clappe from './Clappe';

function isMedium() {
  return /medium/.test(document.head.getAttribute('prefix'));
}

if (isMedium()) {
  new Clappe().install();
}
