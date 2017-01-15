
window.addEventListener('message', e => {
  if (typeof event.data === 'string' && event.data.indexOf('webpackHotUpdate') === 0) {
    chrome.runtime.reload();
  }
});
