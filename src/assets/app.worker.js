/// <reference lib="webworker" />

const log = console.log;
const getType = obj => ({}).toString.call(obj).slice(8, -1);

const postMessageThrottled = (() => {
  const NEXT_TICK = 0;
  const updateFreq = 20; // times per sec
  const updateDelay = 1e3 / updateFreq;
  const dataCache = [];
  let lastUpdate = +new Date();

  return (data, finish) => {
    dataCache.push(data);
    const now = +new Date();
    if (lastUpdate + updateDelay <= now || finish) {
      postMessage(JSON.stringify({finish, data: dataCache.join`\n`}));
      dataCache.length = 0;
    }
  };
})();

const res = (arr, finish = false) => {
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

console.log = (...args) => {
  res(args.map(arg => arg));
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
