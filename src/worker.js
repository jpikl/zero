// All internal variables here are prefixed with `__` in order to obfuscate
// them  for the `eval` call which could potentially overwrite them.

const __MAX_CHAR_COUNT = 1024 * 1024;
const __output = [];
let __charCount = 0;

const __stringify = (value) => {
  switch (typeof value) {
    case "undefined": return "undefined";
    case "string": return value;
    default: return JSON.stringify(value);
  }
}

// Built-in function available to be called from `eval`.
const print = (...args) => {
  for (const arg of args) {
    const strArg = __stringify(arg);

    __output.push(strArg);
    __charCount += strArg.length;

    if (__charCount > __MAX_CHAR_COUNT) {
      throw new Error(`Output exceeded ${__MAX_CHAR_COUNT} characters`);
    }
  }
};

// Built-in function available to be called from `eval`.
const println = (...args) => print(...args, "\n");

const __postMessage = postMessage;
postMessage = undefined;

const __onmessage = __event => {
  __output.length = 0;
  __charCount = 0;

  try {
    eval(__event.data.input);

    __postMessage({
      id: __event.data.id,
      output: __output.join(""),
    });
  } catch (error) {
    __postMessage({
      id: __event.data.id,
      error: error.toString(),
    });
  } finally {
    onmessage = __onmessage;
  }
};

onmessage = __onmessage;
