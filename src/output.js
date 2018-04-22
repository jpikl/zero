const element = document.getElementById('output');

function setValue(value) {
  element.innerHTML = value;
}

function setError(error) {
  setValue(`<div class="error">${error}</div>`);
}

export default {
  setValue,
  setError
};
