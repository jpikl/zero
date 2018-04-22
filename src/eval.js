const EVAL_TIMEOUT_MS = 1000;

const timeouts = {};
const callbacks = {};

let worker = null;
let lastMessageId = 0;

function on(event, callback) {
  callbacks[event] = callback;
}

function emit(event, ...args) {
  const callback = callbacks[event];
  if (callback) {
    callback(...args);
  }
}

function post(input) {
  if (!worker) {
    worker = new Worker('./worker.js');
    worker.onmessage = onMessage;
  }

  const id = ++lastMessageId;

  timeouts[id] = setTimeout(() => {
    worker.terminate();
    worker = null;
    emit('error', `Evaluation exceeded ${EVAL_TIMEOUT_MS}ms`);
  }, EVAL_TIMEOUT_MS);

  worker.postMessage({id, input});
}

function onMessage(event) {
  const {id, error, input, output} = event.data;

  clearTimeout(timeouts[id]);
  delete timeouts[id];

  if (error) {
    emit('error', error);
  } else if (callbacks.success) {
    emit('success', input, output);
  }
}

export default {
  on,
  post,
};
