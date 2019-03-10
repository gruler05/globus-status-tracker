import React from 'react';
import moment from 'moment';
import {
  highlightStatus,
  getStatus,
  bytesToSize
} from '../../services/helperFunctions';
import './DataTable.css';

export default class DataTable extends React.Component {
  getProgress = ({ processed, total }) => {
    const processedValue = bytesToSize(processed || 0);
    const totalValue = bytesToSize(total);
    return `${processedValue}/${totalValue}`;
  };
  render() {
    return (
      <div className="table-container">
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
            {this.props.tableData.map(elem => {
              return (
                <tr key={elem.id}>
                  <td>
                    <div>
                      {
                        getStatus(
                          elem.start_date,
                          elem.end_date,
                          elem.total,
                          elem.processed,
                          elem.remaining
                        ).status
                      }
                    </div>
                    <div
                      dangerouslySetInnerHTML={highlightStatus(elem.status)}
                    />
                  </td>
                  <td>{this.getProgress(elem)}</td>
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
