import React from "react";
import { destination_dict, location_dict } from "../Backend/data.js";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestData: "",
            time: "",
            get: false
        };
    }
    var

    getData() {
        fetch(`https://resource.data.one.gov.hk/td/journeytime.xml`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                var allData = xml.getElementsByTagName('jtis_journey_time');
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
                    var tmp = [];
                    //tmp.push(location_dict[loc_id[i].childNodes[0].nodeValue][0]);
                    tmp.push(loc_id[i].childNodes[0].nodeValue);
                    tmp.push(dest_id[i].childNodes[0].nodeValue);
                    tmp.push(journey_type[i].childNodes[0].nodeValue);
                    tmp.push(journey_data[i].childNodes[0].nodeValue);
                    tmp.push(color_id[i].childNodes[0].nodeValue);
                    all_data.push(tmp);
                }
                console.log(all_data)
                console.log(capture_time);
                this.setState({ latestData: all_data, time: capture_time, get: true });
            })
            .catch(console.error);
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
                    <h2>Info</h2>
                    <p>Loading...</p>
                    <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>
                </div>
            );
        }
        return (
            <div>
                <h2>Info</h2>
                <p>Get la ouo</p>
                <p>Update time: +{this.state.time}</p>
                <table>
                    <tbody>
                        {this.state.latestData.map((value, index) => {
                            if (value[2] === "1") {
                                return (
                                    <tr key={index}>
                                        <td>{value[0]}</td>
                                        <td>{value[1]}</td>
                                        <td></td>
                                        <td>{value[3]}</td>
                                        <td>{value[4]}</td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{value[0]}</td>
                                        <td>{value[1]}</td>
                                        {/*<td>{value[2]}</td>*/}
                                        <td>{value[3]}</td>
                                        <td>{value[4]}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                {/*<ul>
                    {this.state.latestData.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>*/}
                <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>

            </div>
        );
    }
}

export default Info;