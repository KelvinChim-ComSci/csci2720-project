import React from 'react';
import GoogleMapReact from 'google-map-react';
import { location_dict } from '../Backend/data.js';
import { Link } from "react-router-dom";



// longitude = location_dict[loc][1], latitude = location_dict[loc][2]
class Marker extends React.Component {
  render() {
  return (
    <>
    <Link onClick = {() => this.props.changePlace(this.props.place)} to = "/place">
    <div 
    style={{fontWeight: 'bold'}}
    onMouseOver = {() => document.getElementById('popup').innerHTML = this.props.placeName}/*document.getElementById('popup').style.display = 'block'*/
    onMouseOut = {() => document.getElementById('popup').innerHTML = ""}
    >&#8681;</div>
    </Link>
    </>
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
            placeName = {place[0]}

            />
            )}
          )}
        </GoogleMapReact>
      <div id = 'popup'></div>
      </div>
    );
  }
}

export default Map;