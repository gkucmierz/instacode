/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const code = new Function(data);
  const res = (data, finish = false) => {
    postMessage(JSON.stringify({finish, data}));
  };

  console.log = (...args) => {
    res(args.map(arg => arg));
  };

  try {
    code();
    res([], true);
  } catch (e) {
    postMessage(e);
  }
});
