const tryAgain = (loadingFn, resolve) => {
  const result = loadingFn();
  if (result != undefined && result != null) {
    resolve(result);
  } else {
    setTimeout(() => {
      tryAgain(loadingFn, resolve);
    }, 100);
  }
};

export const load = (loadingFn) => {
  // loadingFn = () => value. Assumed value is loaded if not undefined or null
  return new Promise((resolve) => {
    tryAgain(loadingFn, resolve);
  });
};

export const _try = (fn, defaultValue = undefined) => {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
};

export const localStorageAvailable = (type = "localStorage") => {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
};
