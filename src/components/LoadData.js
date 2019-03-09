import React from 'react';

export default class Table extends React.Component {
  doSomething = event => {
    this.props.getData(event.target.value);
  };
  componentDidMount() {
    this.props.getData('https://z3zx53v04m.codesandbox.io/test.json');
  }
  render() {
    return (
      <div>
        <select name="cars" onChange={this.doSomething}>
          <option
            defaultValue
            value="https://z3zx53v04m.codesandbox.io/test.json"
          >
            test1 JSON
          </option>
          <option value="https://z3zx53v04m.codesandbox.io/test2.json">
            test2 JSON
          </option>
          <option value="https://z3zx53v04m.codesandbox.io/test3.json">
            test3 JSON
          </option>
          <option value="https://z3zx53v04m.codesandbox.io/test4.json">
            test4 JSON
          </option>
        </select>
      </div>
    );
  }
}
