export default function objToStr(obj) {
  return Object.keys(obj)
    .map((prop) => `${prop}: ${obj[prop]}`)
    .join(' ');
}
