import EventEmitter from 'eventemitter3';

export default class Evaluator {

  constructor({timeout}) {
    this.timeout = timeout;
    this.timers = {};
    this.emitter = new EventEmitter();
    this.worker = null;
    this.lastMessageId = 0;
    this.handleMessage = this.handleMessage.bind(this);
    this.handleTimeout = this.handleTimeout.bind(this);
  }

  on(event, callback) {
    this.emitter.on(event, callback);
  }

  post(input) {
    if (!this.worker) {
      this.worker = new Worker('./evaluatorWorker.js');
      this.worker.onmessage = this.handleMessage;
    }

    const id = ++this.lastMessageId;

    this.timers[id] = setTimeout(this.handleTimeout, this.timeout);
    this.worker.postMessage({ id, input });
  }

  handleMessage(event) {
    const {id, error, input, output} = event.data;

    clearTimeout(this.timers[id]);
    delete this.timers[id];

    if (error) {
      this.emitter.emit('error', error);
    } else {
      this.emitter.emit('success', input, output);
    }
  }

  handleTimeout() {
    this.worker.terminate();
    this.worker = null;
    this.emitter.emit('error', `Evaluation exceeded ${this.timeout}ms`);
  }

}
