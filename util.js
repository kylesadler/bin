
const tryAgain = (boolFn, resolve) => {
  const result = boolFn();
  if (result) {
    resolve(result);
  } else {
    setTimeout(() => {
      tryAgain(boolFn, resolve);
    }, 100);
  }
};

export function load(boolFn) {
  return new Promise((resolve) => {
    tryAgain(boolFn, resolve);
  });
}

