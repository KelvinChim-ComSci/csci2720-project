/*
import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A keyword was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Search</h2>
          <p>Search for places which contain keywords in one field chosen by the user which will 
            result in a table of place results
          </p>
          <form onSubmit={this.handleSubmit}>
            <label> Keyword:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
          </form>
      </div>
    )
  }
}

export default Search
*/