
import Vue from 'vue';
import App from './contentscript.vue';

const el = document.createElement('div');
document.body.appendChild(el);
const app = new Vue({
  render(createElement) {
    return createElement(App);
  }
});
app.$mount(el);
