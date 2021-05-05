import React from "react";
import Map from "./Map.js"

class MapPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Map 
          center={{lat: 22.302711, lng: 114.177216}}
          zoom={11}
        />
      </div>
    )
  }
}

export default MapPage