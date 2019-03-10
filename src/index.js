import React from 'react';
import ReactDOM from 'react-dom';
import DataTable from './components/DataTable';
import getJsonData from './services/getJsonData';
import LoadData from './components/LoadData';
import { getStatus } from './services/helperFunctions';
import './styles.css';

class App extends React.Component {
  state = {
    data: [],
    hasError: false
  };
  sortData = data => {
    return data.sort((a, b) => {
      const firstValue = a.end_date ? a.end_date.split('+')[0] : 0;
      const secondValue = b.end_date ? b.end_date.split('+')[0] : 0;
      return (
        // primary sort by Inactive & In progress Task, secondary sort by date of completion
        a.order - b.order || +new Date(firstValue) - +new Date(secondValue)
      );
    });
  };
  getAndModifyData = async url => {
    const { DATA: data } = await getJsonData(url);
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
      const sortedData = this.sortData(changedData);
      this.setState({ data: sortedData, hasError: false });
    } else {
      this.setState({ hasError: true });
    }
  };
  // Todo: Mostly Create ErrorHandler component, use componentDidCatch
  render() {
    return (
      <div className="App">
        <LoadData getData={this.getAndModifyData} />
        {this.state.hasError && (
          <h2>
            It looks like something might be wrong with the data. Please check
            your browser console for more details or change the dataset.
          </h2>
        )}
        <DataTable tableData={this.state.data} />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
