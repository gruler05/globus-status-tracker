import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import getJsonData from './services/getJsonData';
import './styles.css';
import LoadData from './components/LoadData';
class App extends React.Component {
  state = {
    data: [],
    hasError: false
  };
  getDataFromFiles = async url => {
    const data = await getJsonData(url);
    this.setState({ data });
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
    // we can log error to the service which we want
    // logError(error, info)
  }
  render() {
    return (
      <div className="App">
        <LoadData getData={this.getDataFromFiles} />
        {this.state.hasError ? (
          <h1>
            Please check your console for more information on error. Refresh the
            page to reset the state of the application
          </h1>
        ) : (
          <Table tableData={this.state.data} />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
