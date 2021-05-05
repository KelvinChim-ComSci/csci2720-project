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
          center={{lat: 59.95, lng: 30.33}}
          zoom={11}
        />
      </div>
    )
  }
}

export default MapPage