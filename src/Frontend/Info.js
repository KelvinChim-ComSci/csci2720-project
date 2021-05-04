import React from "react";
import { Link } from "react-router-dom";
import { destination_dict, location_dict, journal_type2_dict, color_dict } from "../Backend/data.js";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestData: "",
            time: "",
            get: false
        };
        this.sortBy = this.sortBy.bind(this);
    }

    getData() {
        fetch(`https://resource.data.one.gov.hk/td/journeytime.xml`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                //var allData = xml.getElementsByTagName('jtis_journey_time');
                //var columns = ['LOCATION_ID', 'DESTINATION_ID', 'JOURNEY_TYPE', 'JOURNEY_DATA', 'COLOUR_ID'];
                var loc_id = xml.getElementsByTagName('LOCATION_ID');
                var dest_id = xml.getElementsByTagName('DESTINATION_ID');
                var journey_type = xml.getElementsByTagName('JOURNEY_TYPE');
                var journey_data = xml.getElementsByTagName('JOURNEY_DATA');
                var color_id = xml.getElementsByTagName('COLOUR_ID');
                var capture_time = xml.getElementsByTagName('CAPTURE_DATE')[0].childNodes[0].nodeValue;
                var all_data = [];

                var i = 0;
                for (i = 0; i < loc_id.length; i++) {
                    var loc = loc_id[i].childNodes[0].nodeValue;
                    var dest = dest_id[i].childNodes[0].nodeValue;
                    var type = journey_type[i].childNodes[0].nodeValue;
                    var d = journey_data[i].childNodes[0].nodeValue;
                    var c = color_id[i].childNodes[0].nodeValue;
                    all_data.push({ locID: loc, location: location_dict[loc][0], destID: dest, destination: destination_dict[dest], journeyType: type, journeyData: d, color: color_dict[c] });
                }
                //all_data.push({ locID: "H1", location: "test", destID: "tt", destination: "CH", journeyType: "2", journeyData: "3", color: "black" }); //to test journey type 2
                this.setState({ latestData: all_data, time: capture_time, get: true });
            })
            .catch(console.error);
    }

    sortBy(col) {
        var tmp = this.state.latestData;
        if (col === "journeyData") {
            tmp = tmp.sort((a, b) => (a["journeyData"] - b["journeyData"]) > 0 ? 1 : -1)
        } else {
            tmp = tmp.sort((a, b) => a[col].localeCompare(b[col]));
        }
        this.setState({ latestData: tmp });
    }

    componentDidMount() {
        this.getData();
    }

    test12() {
        console.log(location_dict['H1'][0])
    }

    render() {
        if (!this.state.get) {
            return (
                <div>
                    <h2>Real-time Data</h2>
                    <p>Loading...</p>
                </div>
            );
        }
        return (
            <div>
                <h2>Real-time Data</h2>
                <p>Update time: +{this.state.time}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Location ID <button type="button" onClick={() => this.sortBy("locID")}>sort</button> </th>
                            <th>Location <button type="button" onClick={() => this.sortBy("location")}>sort</button></th>
                            <th>Destination ID <button type="button" onClick={() => this.sortBy("destID")}>sort</button></th>
                            <th>Destination <button type="button" onClick={() => this.sortBy("destination")}>sort</button></th>
                            <th>Journey Time / Traffic Status <button type="button" onClick={() => this.sortBy("journeyData")}>sort</button></th>
                            <th>Color Code <button type="button" onClick={() => this.sortBy("color")}>sort</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.latestData.map((value, index) => {
                            if (value['journeyType'] === "1") {
                                return (
                                    <tr key={index}>
                                        <Link onClick={() => console.log(value['locID'])} to="/place">
                                            <td>{value['locID']}</td>   {/*location ID*/}
                                        </Link>
                                        <td>{value['location']}</td>      {/*location*/}
                                        <td>{value['destID']}</td>                     {/*destination ID*/}
                                        <td>{value['destination']}</td>   {/*destination*/}
                                        <td>{value['journeyData']} mins</td>                {/*journey time*/}
                                        <td>{value['color']}</td>               {/*color code*/}
                                    </tr>

                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{value['locID']}</td>                           {/*location ID*/}
                                        <td>{value['location']}</td>                        {/*location*/}
                                        <td>{value['destID']}</td>                          {/*destination ID*/}
                                        <td>{value['destination']}</td>                     {/*destination*/}
                                        <td>{journal_type2_dict[value['journeyData']]}</td> {/*traffic status*/}
                                        <td>{value['color']}</td>               {/*color code*/}
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div >

        );
    }
}

export default Info;