
export default class OutputRenderer {

  constructor(element) {
    this.element = element;
    this.element.classList.add('ace_editor', 'ace-monokai'); // To match style with editor
  }

  renderOutput(output) {
    this.element.innerHTML = output;
  }

  renderError(error) {
    this.renderOutput(`<div class="error">${error}</div>`);
  }

}
