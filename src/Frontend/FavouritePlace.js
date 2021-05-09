/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { location_dict, loc_to_dest_dict } from "../Backend/data.js";



class FavouritePlace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: "No Favourite Place is found",
    };

  }

  async componentDidMount() {
    var username = this.props.username;
    var url = "http://csci2720-g101.cse.cuhk.edu.hk/fav/";
    await fetch(
      url + username, // Please use your own port when working.
      { // Otherwise it won't work.
        method: "GET",
        headers: new Headers({
          "Content-Type": 'application/txt',
        }),
      }
    )
      .then(response => response.text())
      .then(data => { this.setState({ hits: data }); }

      );

  }


  render() {
    var loc = this.state.hits;

    if (loc === "No Favourite Place is found")
      return (
        <div>
          <h3>No Favourite Place is found</h3>
        </div>
      );

    var locd = location_dict[loc];
    locd = "" + locd; locd = locd.toString(); var n = locd.search(",");
    var locinfo = locd.slice(0, n);
    var loclong = locd.slice(n + 1,); var n1 = loclong.search(",");
    loclong = loclong.slice(0, n1);
    var loclad = locd.slice(n + 1,); var n2 = loclad.search(",");
    loclad = loclad.slice(n2 + 1,); var n3 = loclad.search(",");
    loclad = loclad.slice(0, n3);
    var dest = loc_to_dest_dict[loc];
    var destd = "" + dest; destd = destd.toString();

    return (
      <div className="favcss" >
        <div className=" w3-padding-16 w3-round-xlarge w3-container">
          <h3 class="pla">Your Favourite Place is : {locinfo} ({this.state.hits})</h3>
        </div>
        <p></p>

        <div className="plac ">
          <h3> Details: </h3>
          <p> Location description: {locinfo}</p>
          <p> Location Longitude : {loclong}</p>
          <p> Location Longitude : {loclad}</p>

        </div>
        <p></p>
        <div className=" place ">
          <div> <h3> Possible Destination ID:</h3> <p>{destd}</p></div>
        </div>
        <p></p>
        <div className="place1 ">
          <div > <h3> Reference for destination ID: </h3> <p className="small">
            <p>   CH : Cross Harbour Tunnel </p>
            <p> EH : Eastern Harbour Crossing </p>
            <p> WH : Western Harbour Crossing</p>
            <p> LRT : Lion Rock Tunnel</p>
            <p> SMT : Shing Mun Tunnel</p>
            <p> TCT : Tate's Cairn Tunnel</p>
            <p> TKTL : Ting Kau, via Tai Lam Tunnel</p>
            <p> TKTM : Ting Kau, via Tuen Mun Road</p>
            <p> TSCA : Tsing Sha Control Area</p>
            <p> TWCP : Tsuen Wan via Castle Peak</p>
            <p> TWTM : Tsuen Wan via Tuen Mun</p></p></div>
        </div>

      </div>


    );
  }
}

export default FavouritePlace;
