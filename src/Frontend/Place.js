import React from "react";
import { location_dict, destination_dict, loc_to_dest_dict } from "../Backend/data.js";
import Comment from "./Comment.js";

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments:[]
        }
    }

    getData() {
        var status;
        console.log("this.props.place: " + this.props.place);
        fetch(
            `http://csci2720-g114.cse.cuhk.edu.hk/fetchComment`, // Please use your own port when working.
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
                    this.setState({comments: res.data});
                    //console.log("comment");
                    //console.log(this.state.comments);
                }
            })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const loc = this.props.place;
        return (
            <div>
                <h2>Place</h2>
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
                <Comment 
                    comments={this.state.comments}
                    username={this.props.username}
                    locID={this.props.place}
                />
            </div>
        );
    }
}

export default Place;