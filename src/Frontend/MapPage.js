/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import Map from "./Map.js"

class MapPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Map changePlace = {this.props.changePlace}
          center={{lat: 22.302711, lng: 114.177216}}
          zoom={11}
          place = {this.props.place}
        />
      </div>
    )
  }
}

// Last Changed: 01:24 7/5/2021
export default MapPage;