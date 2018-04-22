const __MAX_OUTPUT_LENGTH__ = 1024 * 1024;

const __output__ = {
  buffer: [],
  length: 0,

  clear() {
    this.buffer.length = 0;
    this.length = 0;
  },

  add(...args) {
    const value = args.join('');
    this.buffer.push(value);
    this.length += value.length;
    if (this.length > __MAX_OUTPUT_LENGTH__) {
      throw new Error(`Output exceeded ${__MAX_OUTPUT_LENGTH__} characters`);
    }
  },

  get() {
    return this.buffer.join('');
  },
};

const print = (...args) => __output__.add(...args);
const println = (...args) => __output__.add(...args, '\n');

const __postMessage__ = postMessage;

const __onmessage__ = __event__ => {
  __output__.clear();

  try {
    eval(__event__.data.input);

    __postMessage__({
      id: __event__.data.id,
      input: __event__.data.input,
      output: __output__.get(),
    });
  } catch (error) {
    __postMessage__({
      id: __event__.data.id,
      error: error.toString()
    });
  } finally {
    onmessage = __onmessage__;
  }
};

onmessage = __onmessage__;
