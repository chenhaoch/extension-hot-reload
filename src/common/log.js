
/* eslint no-console: "off" */
const isDev = process.env.NODE_ENV === 'development';

export function info(...args) {
  if (isDev) {
    console.info.call(console, ...args);
  }
}

export function warn(...args) {
  console.warn.call(console, ...args);
}

export function error(...args) {
  console.error.call(console, ...args);
}
