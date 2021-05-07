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