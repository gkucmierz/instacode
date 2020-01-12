/// <reference lib="webworker" />

let res;
const log = console.log;
console.log = (...args) => res(args);

const postMessageThrottled = (() => {
  const pm = postMessage;
  postMessage = _ => _;
  const updateFreq = 20; // times per sec
  const updateDelay = 1e3 / updateFreq;
  let dataCache = [];
  let lastUpdate = +new Date();

  return (data, finish) => {
    const now = +new Date();
    if (data !== '') {
      dataCache.push(data); 
    }
    if (lastUpdate + updateDelay <= now || finish) {
      pm(JSON.stringify({finish, data: dataCache.join`\n`}));
      dataCache = [];
    }
  };
})();

res = (arr, finish = false) => {
  const getType = obj => ({}).toString.call(obj).slice(8, -1);
  const data = arr.map(obj => {
    switch (getType(obj)) {
      case 'Symbol':
        return obj.toString();
      case 'BigInt':
        return `${obj}n`;
      case 'String':
        return `"${obj}"`;
      case 'Number':
      case 'Boolean':
      case 'Null':
      case 'Undefined':
      case 'Object':
      default:
        return obj + '';
    }
  }).join` `;
  postMessageThrottled(data, finish);
};

addEventListener('message', ({ data }) => {
  try {
    const code = new Function(data);
    code();
    res([], true);
  } catch (e) {
    res([e]);
    res([], true);
  }
});
