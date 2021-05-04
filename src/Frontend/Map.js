/*import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 59.95,
                lng: 30.33
            },
            zoom: 11
        };
    }
  
 
  render() {
    return (
      // Important! Always set the container height explicitly
      // Key is AIzaSyCJdRfhVCq5eYChojMx5dV7skmGy1IGm2s
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: AIzaSyCJdRfhVCq5eYChojMx5dV7skmGy1IGm2s }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

var map = new Map();
export default Map;*/