import React from 'react';
import moment from 'moment';
export default class Table extends React.Component {
  convertSec = time => {
    const date = new Date(time * 1000).toISOString().substring(11, 19);
    return date;
  };

  getStatus = (startDate = '', endDate = '', total, processed, remaining) => {
    if (!startDate) {
      // if status is INACTIVE
      return 'Not started';
    } else {
      if (!endDate) {
        // if status is in progress
        return `Time Remaining: ${this.convertSec(remaining)}`;
      }
    }
    if (startDate && endDate) {
      // status success or error
      return total !== processed
        ? `Halted ${moment(endDate, 'YYYY-MM-DDTHH:mm:ss.SSS+-HH:mm').format(
            'MM/DD/YYYY hh:mm A'
          )}`
        : `Completed: ${moment(
            endDate,
            'YYYY-MM-DDTHH:mm:ss.SSS+-HH:mm'
          ).format('MM/DD/YYYY hh:mm A')}`;
    }
  };

  bytesToSize = bytes => {
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
  render() {
    const { data } = this.props;
    console.log(data);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Progress</th>
              <th>User</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map(elem => {
              return (
                <tr key={elem.id}>
                  <td>
                    <div>
                      {this.getStatus(
                        elem.start_date,
                        elem.end_date,
                        elem.total,
                        elem.processed,
                        elem.remaining
                      )}
                    </div>
                    <div>{elem.status}</div>
                  </td>
                  <td>{`${this.bytesToSize(
                    elem.processed || 0
                  )} / ${this.bytesToSize(elem.total)}`}</td>
                  <td>
                    <a href={`mailto:${elem.email}`}>{elem.fullname}</a>
                  </td>
                  <td>
                    {moment(
                      elem.request_date,
                      'YYYY-MM-DDTHH:mm:ss.SSS+-HH:mm'
                    ).format('MM/DD/YYYY hh:mm A')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
