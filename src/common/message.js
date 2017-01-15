
import { info } from './log';

// eslint-disable-next-line
export function sendMessage(event, data, response) {
  let d = data;
  let r = response;
  if (typeof data === 'function' && !r) {
    d = {};
    r = data;
  }

  info('[sendMessage] ', event);
  chrome.runtime.sendMessage('', event, d, (responseMsg) => {
    info('[sendMessageBack]', event, responseMsg);
    r(responseMsg);
  });
}
