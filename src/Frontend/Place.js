import React from "react";
import { location_dict, destination_dict, loc_to_dest_dict } from "../Backend/data.js";

class Place extends React.Component {
    constructor(props) {
        super(props);
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
            </div>
        );
    }
}

export default Place;