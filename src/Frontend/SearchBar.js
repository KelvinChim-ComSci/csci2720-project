import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // this.setInput = this.setInput.bind(this);

  }

  render() {
    return (
      <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search location</span>
        </label>
        <input
            value={this.props.searchQuery}
            onInput={e => this.props.setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search location"
            name="s" 
        />
        {/*<button type="submit">Search</button>*/}
    </form>
    )
  }
}

export default SearchBar