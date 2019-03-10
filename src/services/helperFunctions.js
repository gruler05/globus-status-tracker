import moment from 'moment';
import 'moment-timezone';

const convertSeconds = time => {
  const date = moment.unix(time).format('hh:mm:ss');
  const seconds = moment.duration(date, 'hh:mm:ss').asSeconds();
  const day = Math.floor(seconds / (3600 * 24));
  return day >= 2 ? `${day} days` : date;
};
const highlightStatus = text => {
  const valuesToHighlight = [
    'success',
    'Success',
    'error',
    'Error',
    'fail',
    'Fail',
    'SUCCESS',
    'FAIL',
    'ERROR'
  ];
  let value = '';
  valuesToHighlight.forEach(elem =>
    text.includes(elem) ? (value = elem) : ''
  );
  if (value) {
    const subString = text.substr(text.indexOf(value), value.length);
    return { __html: text.replace(subString, subString.bold()) };
  }
};

// Todo: Refactor this code for reusing with different component in future
const getStatus = (
  startDate = '',
  endDate = '',
  total,
  processed,
  remaining
) => {
  if (!startDate) {
    // if status is INACTIVE
    return { type: 'INACTIVE', status: 'Not started', order: 1 };
  } else {
    if (!endDate) {
      // if status is in progress
      return {
        type: 'IN_PROGRESS',
        status: `Time Remaining: ${convertSeconds(remaining)}`,
        order: 2
      };
    }
  }
  if (startDate && endDate) {
    // status success or error
    return total !== processed
      ? {
          type: 'ERROR',
          status: `Halted ${moment
            .tz(endDate, 'YYYY-MM-DDTHH:mm:ss.SSS+-HH:mm', moment.tz.guess())
            .format('MM/DD/YYYY hh:mm A')}`,
          order: 4
        }
      : {
          type: 'COMPLETED',
          status: `Completed: ${moment
            .tz(endDate, 'YYYY-MM-DDTHH:mm:ss.SSS+-HH:mm', moment.tz.guess())
            .format('MM/DD/YYYY hh:mm A')}`,
          order: 3
        };
  }
};

const bytesToSize = bytes => {
  const SIZES = ['b', 'kB', 'MB', 'GB', 'TB'];
  let bytesToConvert = bytes;
  for (let i = 0; i < SIZES.length; i++) {
    if (bytesToConvert <= 1024) {
      return `${bytesToConvert}${SIZES[i]}`;
    } else {
      bytesToConvert = parseFloat(bytesToConvert / 1024).toFixed(2);
    }
  }
};

export { highlightStatus, getStatus, bytesToSize };
