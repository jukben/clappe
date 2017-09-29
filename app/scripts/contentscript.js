// Enable chromereload by uncommenting this line:
import 'chromereload/devonly';
import React from 'react';
import ReactDOM from 'react-dom';
import Clappe from './contentscript/Clappe';

function isMedium() {
  return /medium/.test(document.head.getAttribute('prefix'));
}

function getXsfrToken(html) {
  const tokenRegex = /"xsrfToken":"([a-zA-Z0-9]*)"/;
  return html.match(tokenRegex) && html.match(tokenRegex)[1];
}

function getTotalClapCount(html) {
  const totalClapCountRegex = /"totalClapCount":"([0-9]*)"/;
  return html.match(totalClapCountRegex) && html.match(totalClapCountRegex)[1];
}

function clapCount(html) {
  const clapCountRegex = /"clapCount":"([0-9]*)"/;
  return html.match(clapCountRegex) && html.match(clapCountRegex)[1];
}

if (isMedium()) {
  const clappeContainers = document.querySelectorAll(
    '.js-actionMultirecommend'
  );

  const clappeButtons = document.querySelectorAll(
    '.js-actionMultirecommendButton'
  );

  const html = document.body.innerHTML;

  [...clappeButtons].forEach(container =>
    container.addEventListener('click', () => console.log('ok'))
  );

  [...clappeContainers].map(node =>
    ReactDOM.render(
      <Clappe
        xsfrToken={getXsfrToken(html)}
        totalClapCount={getTotalClapCount(html)}
        clapCount={getTotalClapCount(html)}
        userId={'e8f43163d9b0'}
        dataPostId={node.getAttribute('data-post-id')}
      />,
      node.appendChild(document.createElement('div'))
    )
  );
}
