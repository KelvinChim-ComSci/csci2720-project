import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {
    constructor(props) {
        super(props);
    }
  
 
  render() {
    return (
      // Important! Always set the container height explicitly
      // Key is AIzaSyCJdRfhVCq5eYChojMx5dV7skmGy1IGm2s
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBhVbCumzcBYSl-jizd9Lf04uhdZ6Qlrv8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          //onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent
            lat={22.302711}
            lng={114.177216}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

// var map = new Map();
export default Map