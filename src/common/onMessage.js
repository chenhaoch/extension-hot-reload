
import { info } from './log';

const messageHandlers = {
  handlers: {},
  doListener(msg, sender, response) {
    info('[onMessage]', msg);
    const responseFn = (responseMsg) => {
      info('[onMessageBack]', responseMsg);
      response(responseMsg);
    };
    this.handlers[msg].call(this, msg, sender, responseFn);
  },
  push(event, process) {
    if (this.handlers[event]) {
      throw Error(`重复监听${event}事件`);
    }
    if (!process || typeof process !== 'function') {
      throw Error(`监听${event}必须传入回调函数`);
    }

    this.handlers[event] = process;
  }
};

let isRegister = false;

// eslint-disable-next-line
export function registerMessage(event, process) {
  messageHandlers.push(event, process);
  if (!isRegister) {
    chrome.runtime.onMessage.addListener((msg, sender, response) => {
      messageHandlers.doListener(msg, sender, response);
    });
    isRegister = true;
  }
}
