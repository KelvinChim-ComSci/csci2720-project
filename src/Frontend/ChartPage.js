/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import { destination_dict, location_dict, journal_type2_dict, color_dict, loc_to_dest_dict } from "../Backend/data.js";
Chart.register(...registerables);

class ChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: "H1",
            latestData: [],
            get: false,
            createChart: false,
            data: {
                labels: [],
                datasets: []
            },
        };
    }

    async componentDidMount() {
        var day = new Date();
        var d = day.getFullYear() + ('0' + (day.getMonth() + 1)).slice(-2) + ('0' + day.getDate()).slice(-2);
        var hour = day.getHours();
        var min = day.getMinutes();
        var t = ('0' + (day.getHours())).slice(-2) + ('0' + day.getMinutes()).slice(-2);
        //this.getData(`https://resource.data.one.gov.hk/td/journeytime.xml`);
        //console.log(this.state.latestData);

        var i;
        for (i = 0; i < 7; i++) {
            this.getData("", d - i, hour, min);
        }
        this.updateDayChart();

    }


    changePlace = e => {
        this.setState({
            place: e.target.value
        });
    }

    async getData(web, day, hr, m) {
        var hour = ('0' + hr).slice(-2);
        var min = ('0' + m).slice(-2);
        var link = web;
        if (web === "") {
            link = "https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fresource.data.one.gov.hk%2Ftd%2Fjourneytime.xml&time=" + day + "-" + hour + min;
        }
        await fetch(link)
            .then(response => response.text())
            .then((data) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                var checkError = xml.getElementsByTagName('Error')[0];
                //used to check we can get the data or not (since the weblink may not be valid) 
                if (!checkError) {
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
                    this.setState({ latestData: all_data, time: capture_time, get: true });
                    //all_data.push({ locID: "H1", location: "test", destID: "tt", destination: "CH", journeyType: "2", journeyData: "3", color: "black" }); //to test journey type 2

                } else {
                    if (m === 0) {
                        this.getData("", day, hr - 1, 59);
                    } else {
                        this.getData("", day, hr, m - 1);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    updateDayChart() {
        var place = this.state.place;

        var PlaceData = this.state.latestData.filter(function (item, index, array) {
            return item.locID === place;
        });

        var destination = [];
        var updatedata = [];
        var color = ["#24e3e3", "#e324a3", "#6024e3"];
        var j = 0;
        for (var tmp of loc_to_dest_dict[place]) {
            var destjourneytime = [];
            var dest = PlaceData.filter(function (item, index, array) {
                return item.destID === tmp;
            });
            dest.sort(function (a, b) {
                return a.time.localeCompare(b.time);
            });
            for (i = 0; i < dest.length; i++) {
                destjourneytime.push(parseInt(dest[i].journeyData));
            }
            updatedata.push({
                label: tmp,
                data: destjourneytime,
                fill: false,
                borderColor: color[j],
            });
            j++;
        }

        var i = 0;
        var timeDate = []
        for (i = 0; i < dest.length; i++) {
            timeDate.push(dest[i].time);
        }

        var datatotake = 0;
        console.log(destjourneytime.length / loc_to_dest_dict[place].length);

        this.setState({
            data:
            {
                labels: timeDate,
                datasets: updatedata,
            }
        })


    }

    render() {
        if (!this.state.get) {
            const allData = [];
            return (
                <div>
                    <h2>Chart</h2>
                    <p>Loading...</p>
                    <button id="displayHour">
                        Waiting time in this hour of past 7 days
                    </button>
                </div>
            );
        }
        return (
            <div>
                <h2>Chart of historical data + {this.state.place}</h2>
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
                <button id="displayHour" onClick={() => { this.updateDayChart() }}
                >
                    Waiting time in this hour of past 7 days
                </button>
                <button id="displayWeek">Waiting time in the past 10 hours</button>
                {/*<p>{this.state.place}</p>*/}
                {/*<button onClick={() => console.log(this.state.latestData)}>...</button>*/}
                <Line data={this.state.data} />
                <hr />

            </div>
        );
    }
}

/*
Idea for making the Chart work: 
1. fetch the data with componentdidMount
2. put the data in a div by getElementbyId
3. call the chart by pressing the button, so the action is done after the data is fetched.
*/

export default ChartPage;