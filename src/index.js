import fs from 'fs';
import debounce from 'debounce';
import createEditor from './createEditor';
import Evaluator from './Evaluator';
import OutputRenderer from './OutputRenderer';
import StorageWrapper from './StorageWrapper';

function createRootElement(id) {
  const element = document.createElement('div');
  element.id = id;
  document.body.appendChild(element);
  return element;
}

const editorElement = createRootElement('editor');
const outputElement = createRootElement('output');

const intro = fs.readFileSync(__dirname + '/intro.js', 'utf8');
const evaluator = new Evaluator({timeout: 500});
const editor = createEditor(editorElement);
const renderer = new OutputRenderer(outputElement);
const storage = new StorageWrapper(localStorage);

evaluator.on('success', (input, output) => {
  renderer.renderOutput(output);
  storage.saveInput(input);
});

evaluator.on('error', error => {
  renderer.renderError(error);
})

editor.on('change', debounce(() => {
  evaluator.post(editor.getValue());
}, 500));

editor.setValue(storage.loadInput() || intro);
editor.focus();
