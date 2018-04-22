import fs from 'fs';
import editor from './editor';
import eval from './eval';
import output from './output';
import storage from './storage';
import {debounce} from './utils';

const intro = fs.readFileSync(__dirname + '/intro.js', 'utf8');

eval.on('success', (input, result) => {
  output.setValue(result);
  storage.saveInput(input);
});

eval.on('error', error => {
  output.setError(error);
})

editor.on('change', debounce(500, () => {
  eval.post(editor.getValue());
}));

editor.setValue(storage.loadInput() || intro);
