import React from "react";
import { location_dict, destination_dict, loc_to_dest_dict } from "../Backend/data.js";
import Comment from "./Comment.js";

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        }

        //this.updateHandler = this.updateHandler.bind(this);
    }

    getData() {
        var status;
        console.log("this.props.place: " + this.props.place);
        fetch(
            `http://csci2720-g110.cse.cuhk.edu.hk/fetchComment`, // Please use your own port when working.
            { // Otherwise it won't work.
                method: "POST",
                headers: new Headers({
                    "Content-Type": 'application/json',
                    //"Access-Control-Allow-Origin" : "'http://localhost:3000'",
                    //"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                    //"Access-Control-Allow-Credentials" : true, 
                }),
                body: JSON.stringify({
                    location: this.props.place
                }),
            }
        )
            .then((res) => {
                status = res.status;
                return res;
            })
            .then((res) => res.json())
            .then((res) => {
                if (status === 200) {
                    //console.log(res.data);
                    this.setState({ comments: res.data });
                    //console.log("comment");
                    //console.log(this.state.comments);
                }
            })
    }

    /*
    updateHandler() {
        console.log("update...");
    }
    */

    componentDidMount() {
        this.getData();
    }

    /*
    componentDidUpdate() {
        this.getData();
    }
    */

    add(){ 
        fetch(
          `http://csci2720-g110.cse.cuhk.edu.hk/favadd`, // Please use your own port when working.
          { // Otherwise it won't work.
            method: "POST",
            headers: new Headers({
              "Content-Type": 'application/json',
            }),
            body: JSON.stringify({
			  username: window.localStorage.getItem("username"),
              loc:  document.getElementById("fav-loc").value,
              
            }),
          }
        )
          .then((res) => {
            if (res.status === 200) { 
                alert("Successfully Added");
                return console.log("Successfully Added");
              }
            else if (res.status === 422) 
            alert("Fail. You already have your favourite place.");
            return console.log("Fail. You already have your favourite place. ");
          })
      }

    render() {
        const loc = this.props.place;
        return (
            <div>
                <h2>Place</h2>  <button id="fav-loc" value={loc} type="button" onClick={this.add}>Add To Your Favourite Place</button>
                <p>Location ID: {loc}</p>
                <p>Location: {location_dict[loc][0]}</p>
                <p>Longitude: {location_dict[loc][1]}E          Latitude: {location_dict[loc][2]}N</p>
                <p>Possible destination:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Destination ID</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loc_to_dest_dict[loc].map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value}</td>
                                    <td>{destination_dict[value]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/*Comments are fetched below*/}
                <hr />
                <h1>Comment</h1>
                <Comment
                    comments={this.state.comments}
                    locID={this.props.place}

                />
                {/*updateHandler={this.updateHandler()}*/}
            </div>
        );
    }
}

export default Place;