/// <reference lib="webworker" />

import { stringify } from 'javascript-stringify';
import { MAX_DATA_SIZE } from './app.config';

const log = console.log;
// tslint:disable-next-line: no-use-before-declare
console.log = (...a) => l(a);
// tslint:disable-next-line: no-use-before-declare
console.error = a => e(a);

// limit chunk of data sent to browser, to avoid eventloop blocking
const limitData = data => {
  if (data.length > MAX_DATA_SIZE) {
    return data.substr(0, MAX_DATA_SIZE);
  }
  return data;
};

const throttledPM = (() => {
  const pm = postMessage;
  // tslint:disable-next-line: no-string-literal
  self['postMessage'] = log;
  const updateFreq = 20; // times per sec
  const updateDelay = 1e3 / updateFreq;
  let dataCache = [];
  let lastUpdate = +new Date() - updateDelay;

<<<<<<< HEAD
  return (data, finish = false) => {
    const now = +new Date();
    dataCache.push(data);
=======
  return (data, finish = false, tryAgain = true) => {
    const now = +new Date();
    if (typeof data !== 'undefined') {
      dataCache.push(data);
    }
>>>>>>> web-app

    if (lastUpdate + updateDelay <= now || finish) {
      pm(limitData(dataCache.join('\n')));
      lastUpdate = now;
      dataCache = [];
    }
<<<<<<< HEAD
=======

    if (tryAgain) {
      const nextTick = fn => setTimeout(fn, 0);
      const tryAgainFn = _ => throttledPM([][0], false, false);
      // try push data asap
      setTimeout(tryAgainFn, 0);
      // try push possibly cached data for async code
      setTimeout(tryAgainFn, updateDelay);
    }
>>>>>>> web-app
  };
})();

const l = args => {
  const data = args.map(el => stringify(el, null, '  ')).join(', ');
  throttledPM(data);
};

const e = err => {
  const data = stringify(err);
  throttledPM(data, true);
};

addEventListener('message', ({ data }) => {
  try {
    const code = new Function(data);
    code();
<<<<<<< HEAD
    const nextTick = fn => setTimeout(fn, 0);
    // push data, that possibly waits (for sync code)
    nextTick(_ => throttledPM('', true));
=======
>>>>>>> web-app
  } catch (e) {
    console.error(e);
  }
});
