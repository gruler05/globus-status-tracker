import React from 'react';
import './LoadData.css';
export default class Table extends React.Component {
  onDropdownChange = event => {
    this.props.getData(event.target.value);
  };
  componentDidMount() {
    this.props.getData('./test.json');
  }
  render() {
    return (
      <div className="dataset-container">
        <label htmlFor="dataset">Choose your data set</label>
        <select name="dataset" onChange={this.onDropdownChange}>
          <option defaultValue value="./test.json">
            test1 JSON
          </option>
          <option value="./test2.json">test2 JSON</option>
          <option value="./test3.json">test3 JSON</option>
          <option value="./test4.json">test4 JSON</option>
        </select>
      </div>
    );
  }
}
