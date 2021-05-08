/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
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
            placeholder="search"
            name="s" 
        />
        {/*<button type="submit">Search</button>*/}
    </form>
    )
  }
}

export default SearchBar;