export default (fn) => (...args) => {
  return fn(...args).catch(args[2]);
};
