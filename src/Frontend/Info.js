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


    componentDidMount() {
        fetch(`https://resource.data.one.gov.hk/td/journeytime.xml`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const allData = xml.getElementsByTagName('jtis_journey_time');
                this.setState({ latestData: allData, get: true })
                console.log(this.state.latestData);
                console.log(this.state.latestData[0]);
            })
            .catch(console.error);
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
                <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>
                {/*<p>{this.state.data1}</p>*/}
            </div>
        );
    }
}

export default Info;