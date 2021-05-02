import React from "react";
import { location_dict } from "../Backend/data.js";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestData: "",
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

                //console.log(allData[0].firstChild)
                var i = 0;
                for (i = 0; i < 35; i++) {
                    console.log(loc_id[i].childNodes[0].nodeValue);
                    console.log(dest_id[i].childNodes[0].nodeValue);
                    console.log(journey_type[i].childNodes[0].nodeValue);
                    console.log(journey_data[i].childNodes[0].nodeValue);
                    console.log(color_id[i].childNodes[0].nodeValue);
                }
                console.log(capture_time);
                this.setState({ latestData: allData, get: true });
                /*for (record in allData) {
                    console.log(record);
                }*/

                //console.log(loc_id);
                //document.getElementById("fetchData").innerHTML = xml_to_string(allData);
            })
            .catch(console.error);
    }

    componentDidMount() {
        this.getData();
    }

    test12() {
        console.log(location_dict['H1'])
        //console.log(this.state.data1)
    }

    render() {
        if (!this.state.get) {
            return (
                <div>
                    <h2>Info</h2>
                    <p>Loading...</p>
                    <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>
                    {/*<p>{this.state.data1}</p>*/}
                </div>
            );
        }
        return (
            <div>
                <h2>Info</h2>
                <p>Get la ouo</p>
                <p id="fetchData" ></p>
                <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>

            </div>
        );
    }
}

export default Info;