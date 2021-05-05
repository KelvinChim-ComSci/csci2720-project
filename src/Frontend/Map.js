import React from 'react';
import GoogleMapReact from 'google-map-react';
import { location_dict } from '../Backend/data.js';

// longitude = location_dict[loc][1], latitude = location_dict[loc][2]
const Marker = ({text}) => <div style={{fontWeight: 'bold'}}>O</div>; // Need to change style

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
      // Currently Working, need to change up the coordinates.
      // Key is AIzaSyBhVbCumzcBYSl-jizd9Lf04uhdZ6Qlrv8
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBhVbCumzcBYSl-jizd9Lf04uhdZ6Qlrv8" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.setState({ map, maps })}
        >
          {this.state.markers.map((place) => { 
            return(
            <Marker
            lat = {place[2]} // Number is not accurate, but works.
            lng = {place[1]}
            place = {place[0]}
            />
            )}
          )}
            
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;