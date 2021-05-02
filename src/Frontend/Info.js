import React from "react";
import { location_dict } from "../Backend/data.js";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data1: -1 };
    }


    componentDidMount() {
        fetch(`https://resource.data.one.gov.hk/td/journeytime.xml`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                const allData = xml.getElementsByTagName('jtis_journey_time');
                this.setState({ data1: allData })
                console.log(this.state.data1);
                console.log(allData[0]);
            })
            .catch(console.error);
    }

    test12() {
        console.log(location_dict['H1'])
        //console.log(this.state.data1)
    }

    render() {
        return (
            <div>
                <h2>Info</h2>
                <button id="getInfo" type="button" onClick={this.test12}>getInfo</button>
                <p>location_dict</p>
            </div>
        );
    }
}

export default Info;