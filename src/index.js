const EDIT_TIMEOUT = 500;
const EVAL_TIMEOUT = 500;

const DEFAULT_INPUT = `
// ========================================================
//                         ZERO
//              Minimalist JavaScript REPL
//             https://github.com/jpikl/zero
// ========================================================
//
// Built-in functions:
//   print(...args)    print arguments
//   println(...args)  print arguments + new line

println('Hello world!');
`;

function main() {
  const editor = ace.edit("editor");

  editor.setTheme(`ace/theme/${getEditorTheme()}`);
  editor.setFontSize(16);
  editor.setShowPrintMargin(false);

  const session = editor.getSession();

  session.setMode("ace/mode/javascript");
  session.setTabSize(2);
  session.setUseSoftTabs(true);

  const output = document.getElementById("output");
  output.classList.add(...editor.container.classList); // To match style with the editor

  const evaluate = createEvaluator({
    onSuccess: result => (output.innerHTML = result),
    onError: error => output.innerHTML = `<div class="error">${error}</div>`,
  });

  editor.on("change", debounce(() => {
    setHash(editor.getValue());
    evaluate(editor.getValue());
  }, EDIT_TIMEOUT));

  editor.setValue(getHash() || DEFAULT_INPUT.trim());
  editor.focus();
}

function getEditorTheme() {
  if (window.matchMedia == null || window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dracula";
  } else {
    return "chrome";
  }
}

function createEvaluator({ onSuccess, onError }) {
  let worker = null;

  const handleMessage = event => {
    const { id, error, output } = event.data;
    clearTimeout(id);

    if (error) {
      onError(error);
    } else {
      onSuccess(output);
    }
  };

  const handleTimeout = () => {
    worker.terminate();
    worker = null;
    onError(`Evaluation exceeded ${EVAL_TIMEOUT}ms`);
  };

  return input => {
    if (!worker) {
      worker = new Worker("./worker.js");
      worker.onmessage = handleMessage;
    }

    const id = setTimeout(handleTimeout, EVAL_TIMEOUT);
    worker.postMessage({ id, input });
  };
}

function getHash() {
  const hash = location.hash.substring(1);
  return hash ? binaryToText(atob(hash)) : null;
}

function setHash(value) {
  const hash = value ? btoa(textToBinary(value)) : "";
  history.replaceState(null, "", "#" + hash);
}

function textToBinary(text) {
  const chars = new Uint16Array(text.length);
  for (let i = 0; i < chars.length; i++) {
    chars[i] = text.charCodeAt(i);
  }
  const bytes = new Uint8Array(chars.buffer);
  return String.fromCharCode(...bytes);
}

function binaryToText(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const chars = new Uint16Array(bytes.buffer);
  return String.fromCharCode(...chars);
}

function debounce(callback, delay) {
  let id = 0;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), delay);
  };
}

main();
