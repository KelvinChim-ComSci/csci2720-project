import React from "react";
import { location_dict, destination_dict, loc_to_dest_dict } from "../Backend/data.js";
import  { Component } from 'react';



class FavouritePlace extends React.Component {
  
    constructor(props) {
        super(props);
       
        this.state = {
          hits: "",
        };
    
      }
    
    
      componentDidMount() {
        var username = this.props.username;
        var url= "http://csci2720-g114.cse.cuhk.edu.hk/fav/";
        fetch(
          url+ username , // Please use your own port when working.
          { // Otherwise it won't work.
            method: "GET",
            headers: new Headers({
              "Content-Type": 'application/txt',
            }),  
          }
        )
        .then(response => response.text())
        .then(data => {this.setState({ hits: data });}
        
        );
       
    }


    render() {
      
      var hits  = this.state;
      var loc = this.state.hits;
      var locd=location_dict[loc];
      locd = "" + locd;    locd=locd.toString();  var n = locd.search(",");
      var locinfo=locd.slice(0, n);
      var loclong=locd.slice(n+1, );  var n1 = loclong.search(",");
      loclong=loclong.slice(0,n1 );
      var loclad=locd.slice(n+1, );   var n2 = loclad.search(",");
      loclad=loclad.slice(n2+1, );    var n3 = loclad.search(",");
      loclad=loclad.slice(0,n3);
      var dest= loc_to_dest_dict[loc];
      var destd = "" + dest; destd=destd.toString();

      return (
        <div>
          <h2>
           Your Favourite Place is: {locinfo} ({this.state.hits}) </h2>  
                  
        <h2> Details: </h2>
        <h3>
               <p> Location description: {locinfo}</p>
               <p> Location Longitude : {loclong}</p>
               <p> Location Longitude : {loclad}</p>
        

        <p>Possible destination:</p>
        <table>
                    <thead>
                        <tr>
                            <th>Destination ID</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destd}
                    </tbody>
                </table>

        </h3>
        </div>

        
      );
    }
  }

export default FavouritePlace;
