import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table';
import getJsonData from './services/getJsonData';
import { DATA } from '../static/test.json';
import './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Table data={DATA} />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
