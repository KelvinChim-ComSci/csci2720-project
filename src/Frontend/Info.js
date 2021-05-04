import React from "react";
import { destination_dict, location_dict, journal_type2_dict, color_dict } from "../Backend/data.js";
// import SearchBar from "./SearchBar.js";

var all_data = [];

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestData: "",
            time: "",
            get: false,

            // input: "",
            // searchList: []
        };

        this.sortByLocID = this.sortByLocID.bind(this);
        // this.setInput = this.setInput.bind(this);
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
                // var all_data = [];

                var i = 0;
                for (i = 0; i < loc_id.length; i++) {
                    var loc = loc_id[i].childNodes[0].nodeValue;
                    var dest = dest_id[i].childNodes[0].nodeValue;
                    var type = journey_type[i].childNodes[0].nodeValue;
                    var d = journey_data[i].childNodes[0].nodeValue;
                    var c = color_id[i].childNodes[0].nodeValue;
                    all_data.push({ location: loc, destination: dest, journeyType: type, journeyData: d, color: c });
                }
                //all_data.push({ location: "H1", destination: "CH", journeyType: "2", journeyData: "3", color: "1" }); //to test journey type 2
                this.setState({ latestData: all_data, time: capture_time, get: true });
            })
            .catch(console.error);
    }

    sortByLocID() {
        //bands.sort((a, b) => b[sortProperty] - a[sortProperty])
        console.log("haha");
        var tmp = this.state.latestData;
        console.log(tmp);
        var tmp2 = tmp.sort((a, b) => a.destination.localeCompare(b.destination))
        this.setState({ latestData: tmp });
        console.log(tmp2);
    }

    componentDidMount() {
        this.getData();
    }

    test12() {
        console.log(location_dict['H1'][0])
    }

    /*
    async updateInput(input) {
        const filtered = all_data.filter(data => {
         return data.name.toLowerCase().includes(input.toLowerCase())
        })
        console.log("input: " + input);
        this.setState({input: input});
        console.log("filtered: " + filtered);
        this.setState({searchList: filtered});
    }

    setInput(e) {
        console.log("e");
        this.setState({input: e});
    }
    */

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
                {/*<SearchBar 
                    input={this.state.input} 
                    setInput={setInput}
                    onChange={this.updateInput}
                />*/}
                <h2>Real-time Data</h2>
                <p>Update time: +{this.state.time}</p>
                <button id="getInfo" type="button" onClick={this.sortByLocID}>sort by location ID</button>
                <table>
                    <thead>
                        <tr>
                            <th>Location ID</th>
                            <th>Location</th>
                            <th>Destination ID</th>
                            <th>Destination</th>
                            <th>Journey Time / Traffic Status</th>
                            <th>Color Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.latestData.map((value, index) => {
                            if (value['journeyType'] === "1") {
                                return (
                                    <tr key={index}>
                                        <td>{value['location']}</td>                        {/*location ID*/}
                                        <td>{location_dict[value['location']][0]}</td>      {/*location*/}
                                        <td>{value['destination']}</td>                     {/*destination ID*/}
                                        <td>{destination_dict[value['destination']]}</td>   {/*destination*/}
                                        <td>{value['journeyData']} mins</td>                {/*journey time*/}
                                        <td>{color_dict[value['color']]}</td>               {/*color code*/}
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={index}>
                                        <td>{value['location']}</td>                        {/*location ID*/}
                                        <td>{location_dict[value['location']][0]}</td>      {/*location*/}
                                        <td>{value['destination']}</td>                     {/*destination ID*/}
                                        <td>{destination_dict[value['destination']]}</td>   {/*destination*/}
                                        <td>{journal_type2_dict[value['journeyData']]}</td> {/*traffic status*/}
                                        <td>{color_dict[value['color']]}</td>               {/*color code*/}
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                {/*<button id="getInfo" type="button" onClick={this.test12}>getInfo</button>*/}

            </div>
        );
    }
}

export default Info;