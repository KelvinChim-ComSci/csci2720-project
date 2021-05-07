import React from 'react';
import GoogleMapReact from 'google-map-react';
import { location_dict } from '../Backend/data.js';
import { Link } from "react-router-dom";

// longitude = location_dict[loc][1], latitude = location_dict[loc][2]
class Marker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  return (
    <Link onClick = {() => this.props.changePlace(this.props.place)} to = "/place">
    <div style={{fontWeight: 'bold'}}>O</div>
    </Link>
  )};
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          markers : [],
          map : {},
          maps : {}
        }
    }
    
    

    componentDidMount() {
      this.setState({
        markers: Object.values(location_dict)
      })
    }

  render() {
    return (
      // Key is AIzaSyBhVbCumzcBYSl-jizd9Lf04uhdZ6Qlrv8
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBhVbCumzcBYSl-jizd9Lf04uhdZ6Qlrv8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.setState({ map, maps })}
        >
          {this.state.markers.map((place) => {
            return(
            <Marker changePlace = {this.props.changePlace}
            lat = {place[3]}
            lng = {place[4]}
            place = {place[5]}

            />
            )}
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

// Last Change 22:16 7/5/2021
export default Map;