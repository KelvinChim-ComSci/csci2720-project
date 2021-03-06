/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { location_dict, destination_dict, loc_to_dest_dict } from "../Backend/data.js";
import Comment from "./Comment.js";
import Map from "./Map.js";

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
        fetch(
            `http://csci2720-g96.cse.cuhk.edu.hk/fetchComment`, // Please use your own port when working.
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
                    this.setState({ comments: res.data });
                }
            })
    }

    componentDidMount() {
        this.getData();
    }


    add() {
        fetch(
            `http://csci2720-g96.cse.cuhk.edu.hk/favadd`, // Please use your own port when working.
            { // Otherwise it won't work.
                method: "POST",
                headers: new Headers({
                    "Content-Type": 'application/json',
                }),
                body: JSON.stringify({
                    username: window.localStorage.getItem("username"),
                    loc: document.getElementById("fav-loc").value,

                }),
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    alert("Successfully Added");
                }
                else if (res.status === 422)
                    alert("Fail. You already have your favourite place.");
            })
    }

    render() {
        const loc = this.props.place;
        return (
            <div>
                <h2>Place</h2>
                <div>
                    <Map changePlace={this.props.changePlace}
                        center={{ lat: location_dict[loc][3], lng: location_dict[loc][4] }}
                        zoom={20}
                        place={this.props.place}
                    />
                </div>
                <br></br>
                <button className="favPlaceButton" id="fav-loc" defaultValue={loc} type="button" onClick={this.add}>Add To Your Favourite Place <span style={{ color: "orange" }}>&#9733;</span></button>
                <h3>Location Information</h3>
                <p>Location ID: {loc}</p>
                <p>Location: {location_dict[loc][0]}</p>
                <p>Easting: {location_dict[loc][1]}E </p>
                <p>Northing: {location_dict[loc][2]}N</p>
                <p>Longitude: {location_dict[loc][4]} </p>
                <p>Latitude: {location_dict[loc][3]}</p>
                <br />
                <h3>Possible destination:</h3>
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
                <h3>Comment</h3>
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