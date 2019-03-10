import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import getJsonData from './services/getJsonData';
import './styles.css';
import LoadData from './components/LoadData';
import { getStatus } from './services/helperFunctions';

class App extends React.Component {
  state = {
    data: [],
    hasError: false
  };
  getDataFromFiles = async url => {
    const data = await getJsonData(url);
    if (Array.isArray(data)) {
      const changedData = [...data];
      data.forEach((elem, i) => {
        const { type, status, order } = getStatus(
          elem.start_date,
          elem.end_date,
          elem.total,
          elem.processed,
          elem.remaining
        );
        changedData[i]['type'] = type;
        changedData[i]['new_status'] = status;
        changedData[i]['order'] = order;
      });
      const foo = changedData.sort((a, b) => {
        const firstA = a.end_date ? a.end_date.split('+')[0] : 0;
        const firstB = b.end_date ? b.end_date.split('+')[0] : 0;
        return a.order - b.order || +new Date(firstA) - +new Date(firstB);
      });
      this.setState({ data: foo, hasError: false });
    } else {
      this.setState({ hasError: true });
    }
  };

  render() {
    return (
      <div className="App">
        <LoadData getData={this.getDataFromFiles} />
        {this.state.hasError && (
          <h2>
            It looks like something might be wrong with the data. Please check
            your browser console for more details or change the dataset.
          </h2>
        )}
        <Table tableData={this.state.data} />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
