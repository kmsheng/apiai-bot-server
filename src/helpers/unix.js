import moment, {ISO_8601} from 'moment';

export default function unix(str) {
  return moment(str, ISO_8601).unix();
}
