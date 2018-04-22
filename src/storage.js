const INPUT_KEY = 'input';

function loadInput() {
  return localStorage.getItem(INPUT_KEY);
}

function saveInput(input) {
  if (input) {
    localStorage.setItem(INPUT_KEY, input);
  } else {
    localStorage.removeItem(INPUT_KEY);
  }
}

export default {
  loadInput,
  saveInput,
};
