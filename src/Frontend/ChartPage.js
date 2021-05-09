/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

import React from "react";
import { Chart, registerables } from 'chart.js';
import { destination_dict, location_dict, journal_type2_dict, color_dict } from "../Backend/data.js";
Chart.register(...registerables);

class ChartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: "H1",
            latestData: [],
            get: false,
            createChart: false,
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
        for (i = 0; i < 10; i++) {
            this.getData("", d - i, hour, min);
        }
        console.log(this.state.latestData);

    }

    async handleData() {
        var theData = [];
        theData = await this.getData(`https://resource.data.one.gov.hk/td/journeytime.xml`)
        console.log(theData);
        return theData;
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

    createChart() {
        var x_axis = [];
        var y_axis = [];
        var ctx = document.getElementById('myFirstChart');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [1, 2, 3, 4, 5, 6], // x axis
                datasets: [{
                    data: [500, 500, 500, 500, 500, 500, 500], // y axis
                    label: "H1",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: [282, 350, 411, 502, 635, 809, 947], // y axis
                    label: "H2",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734], // y axis
                    label: "H3",
                    borderColor: "#3cba9f",
                    fill: false
                }, {
                    data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784], // y axis
                    label: "K01",
                    borderColor: "#e8c3b9",
                    fill: false
                }, {
                    data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433], // y axis
                    label: "K02",
                    borderColor: "#c45850",
                    fill: false
                }
                ]
            },

            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Waiting time in the past 10 hours',
                    }
                },

                scales: {
                    x: {
                        type: 'linear'
                    },
                    y: {
                        type: 'linear'
                    }
                }

            }
        })
    }

    addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }

    removeData(chart) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }

    updateChart() {
        if (!this.state.createChart) {
            this.createChart();
            this.setState({ createChart: true });
        } else {
            console.log(document.getElementById('myFirstChart'));
            //this.removeData(chart)
        }
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
                <button id="displayHour" onClick={() => { this.updateChart() }}
                >
                    Waiting time in this hour of past 7 days
                </button>
                <button id="displayWeek">Waiting time in the past 10 hours</button>
                {/*<p>{this.state.place}</p>*/}
                {/*<button onClick={() => console.log(this.state.latestData)}>...</button>*/}
                <canvas id="myFirstChart" width="400" height="400"></canvas>
                <hr />
                <canvas id="mySecondChart" width="400" height="400"></canvas>
                <div id="allData"></div>
                <div id="hourData" style={{ display: 'none' }}></div>
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