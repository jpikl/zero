const INPUT_KEY = 'input';

export default class StorageWrapper {

  constructor(storage) {
    this.storage = storage;
  }

  loadInput() {
    return this.storage.getItem(INPUT_KEY);
  }

  saveInput(input) {
    if (input) {
      this.storage.setItem(INPUT_KEY, input);
    } else {
      this.storage.removeItem(INPUT_KEY);
    }
  }

}
