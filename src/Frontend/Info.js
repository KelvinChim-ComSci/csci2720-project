import React from "react";

class Info extends React.Component {

    getData() {
        fetch(`https://resource.data.one.gov.hk/td/journeytime.xml`)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                console.log(xml.getElementsByTagName('jtis_journey_time')[0]);
            })
            .catch(console.error);
    }

    render() {
        return (
            <div>
                <h2>Info</h2>
                <button id="getInfo" type="button" onClick={this.getData}>getInfo</button>
            </div>
        );
    }
}

export default Info;