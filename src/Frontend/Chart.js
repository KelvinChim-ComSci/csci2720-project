import React from "react";
import { destination_dict, location_dict, journal_type2_dict, color_dict } from "../Backend/data.js";

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: "H1",
            latestData: [],
            get: false,
        };
    }

    componentDidMount() {
        var day = new Date();
        this.getData(`https://resource.data.one.gov.hk/td/journeytime.xml`);
        this.getData(`https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/2021/05/04/https%253A%252F%252Fresource.data.one.gov.hk%252Ftd%252Fjourneytime.xml/0226`);
        //this.getData(`https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/2021/05/04/https%253A%252F%252Fresource.data.one.gov.hk%252Ftd%252Fjourneytime.xml/0227`);
        console.log(this.state.latestData);
        console.log(day);
        ('0' + 11).slice(-2)
        console.log(day.getFullYear() + '/' + ('0' + (day.getMonth() + 1)).slice(-2) + '/' + ('0' + day.getDate()).slice(-2));     //day
    }


    changePlace = e => {
        this.setState({
            place: e.target.value
        });
    }

    getData(web) {
        fetch(web)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                console.log("ouo");
                var capture_time = xml.getElementsByTagName('CAPTURE_DATE')[0].childNodes[0].nodeValue;
                var loc_id = xml.getElementsByTagName('LOCATION_ID');
                var dest_id = xml.getElementsByTagName('DESTINATION_ID');
                var journey_type = xml.getElementsByTagName('JOURNEY_TYPE');
                var journey_data = xml.getElementsByTagName('JOURNEY_DATA');
                var color_id = xml.getElementsByTagName('COLOUR_ID');
                var all_data = this.state.latestData;
                var i = 0;
                for (i = 0; i < loc_id.length; i++) {
                    var loc = loc_id[i].childNodes[0].nodeValue;
                    var dest = dest_id[i].childNodes[0].nodeValue;
                    var type = journey_type[i].childNodes[0].nodeValue;
                    var d = journey_data[i].childNodes[0].nodeValue;
                    var c = color_id[i].childNodes[0].nodeValue;
                    all_data.push({ locID: loc, destID: dest, journeyType: type, journeyData: d, color: color_dict[c], time: capture_time });
                }
                //all_data.push({ locID: "H1", location: "test", destID: "tt", destination: "CH", journeyType: "2", journeyData: "3", color: "black" }); //to test journey type 2

                this.setState({ latestData: all_data, time: capture_time, get: true });
                console.log("try");
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        return (
            <div>
                <h2>Chart of historical data</h2>
                {/*<p>{Object.keys(location_dict)}</p>*/}
                <select onChange={this.changePlace}>
                    {
                        Object.keys(location_dict).map((key, index) => {
                            return (
                                <option key={index} value={key}>{key}</option>
                            )
                            {/*<p key={index}> {key} + {location_dict[key][0]}</p>*/ }
                        })
                    }
                </select>
                <p>{this.state.place}</p>
            </div>
        );
    }
}

export default Chart;