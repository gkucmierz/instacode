/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const log = console.log;
  const getType = obj => ({}).toString.call(obj).slice(8, -1);
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
    postMessage(JSON.stringify({finish, data}));
  };

  console.log = (...args) => {
    res(args.map(arg => arg));
  };

  // try {
  const code = new Function(data);
  code();
  res([], true);
  // } catch (e) {
  //   res([e]);
  //   res([], true);
  // }
});
