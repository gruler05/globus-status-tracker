import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import getJsonData from './services/getJsonData';
import './styles.css';
import LoadData from './components/LoadData';
class App extends React.Component {
  state = {
    data: []
  };
  getDataFromFiles = async url => {
    const data = await getJsonData(url);
    this.setState({ data });
  };
  render() {
    return (
      <div className="App">
        <LoadData getData={this.getDataFromFiles} />
        <Table tableData={this.state.data} />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
