import moment from 'moment';

export default function timestampToStr(timestamp) {
  return moment.unix(timestamp - (8 * 3600)).format('YYYY-MM-DD HH:mm:ss');
}
