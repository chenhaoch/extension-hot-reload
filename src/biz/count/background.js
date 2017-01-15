
import { MSG_COUNT_SHOW, MSG_COUNT_INCREMENT } from './msg';
import { registerMessage } from '../../common/onMessage';

let count = 0;

registerMessage(MSG_COUNT_SHOW, (msg, sender, response) => {
  response({
    isShow: count < 10
  });
});

registerMessage(MSG_COUNT_INCREMENT, (msg, sender, response) => {
  count += 1;
  response({
    count
  });
});
