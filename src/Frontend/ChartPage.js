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
        };
    }

    componentDidMount() {
        var day = new Date();
        var d = day.getFullYear() + '/' + ('0' + (day.getMonth() + 1)).slice(-2) + '/' + ('0' + day.getDate()).slice(-2);
        var t = ('0' + (day.getHours())).slice(-2) + ('0' + day.getMinutes()).slice(-2);
        this.getData(`https://resource.data.one.gov.hk/td/journeytime.xml`);
        console.log("code line 21: ")
        console.log(this.state.latestData);
        //try error web
        this.getData(`https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/2021/05/04/https%253A%252F%252Fresource.data.one.gov.hk%252Ftd%252Fjourneytime.xml/0227`);

        this.getData(`https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/` + d + `/https%253A%252F%252Fresource.data.one.gov.hk%252Ftd%252Fjourneytime.xml/` + t);
        
        //now the getData() can check the webpage has error or not and get out of the function is it is error page
        //the part I have not do yet:
        //1. loop var d and t to fetch data from different time
        //2. check change t (-1 min) if the webpage is invalid (do this until the webpage work)
        this.createFirstChart();
    }

    changePlace = e => {
        this.setState({
            place: e.target.value
        });
    }

    async getData(web) {
        fetch(web)
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
                    //all_data.push({ locID: "H1", location: "test", destID: "tt", destination: "CH", journeyType: "2", journeyData: "3", color: "black" }); //to test journey type 2
                    this.setState({ latestData: all_data, time: capture_time, get: true });
                    console.log("code line 68: ");
                    console.log(this.state.latestData[3].journeyData);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    createFirstChart() {
        console.log("code line 79: ");
        console.log(this.state.latestData);
        // console.log(this.state.latestData[3].journeyData);
 
        var testarray = [1,2,3,4,5,6,7];
        var ctx = document.getElementById('myFirstChart');
        const chart = new Chart(ctx, {
            type: 'line',
            
            data: {
                labels: testarray, // x axis
                datasets: [{ 
                    data: [this.state.latestData.journeyData], // y axis
                    label: "Africa",
                    borderColor: "#3e95cd",
                    fill: false
                  }, { 
                    data: [282,350,411,502,635,809,947], // y axis
                    label: "Asia",
                    borderColor: "#8e5ea2",
                    fill: false
                  }, { 
                    data: [168,170,178,190,203,276,408,547,675,734], // y axis
                    label: "Europe",
                    borderColor: "#3cba9f",
                    fill: false
                  }, { 
                    data: [40,20,10,16,24,38,74,167,508,784], // y axis
                    label: "Latin America",
                    borderColor: "#e8c3b9",
                    fill: false
                  }, { 
                    data: [6,3,2,2,7,26,82,172,312,433], // y axis
                    label: "North America",
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
    render() {
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

                <p>{this.state.place}</p>
                <button id="displayHour">Waiting time in this hour of past 7 days</button>
                <button id="displayWeek">Waiting time in the past 10 hours</button>
                <canvas id="myFirstChart" width="400" height="400"></canvas>
                <hr />
                <canvas id="mySecondChart" width="400" height="400"></canvas>
                <div id="weekData" style={{display: 'none'}}></div>
                <div id="hourData" style={{display: 'none'}}></div>
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