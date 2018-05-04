import fs from 'fs';
import debounce from 'debounce';
import createEditor from './createEditor';
import Evaluator from './Evaluator';
import OutputRenderer from './OutputRenderer';
import StorageWrapper from './StorageWrapper';

const editorElement = document.getElementById('editor');
const outputElement = document.getElementById('output');

const intro = fs.readFileSync(__dirname + '/intro.js', 'utf8');
const evaluator = new Evaluator({timeout: 500});
const editor = createEditor(editorElement);
const renderer = new OutputRenderer(outputElement);
const storage = new StorageWrapper(localStorage);

editor.on('change', debounce(() => {
  evaluator.post(editor.getValue());
}, 500));

evaluator.on('success', (input, output) => {
  renderer.renderOutput(output);
  storage.saveInput(input);
});

evaluator.on('error', error => {
  renderer.renderError(error);
});

editor.setValue(storage.loadInput() || intro);
editor.focus();
