import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";
import extractData from "./lib/data";

function App() {
    const [data, setData] = useState([]);
    const [isLoading, toggleIsLoading] = useState(true);

    const getData = () => {
        toggleIsLoading(true);
        fetch("https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team32.json")
            .then(res => res.json())
            .then(res => {
                extractData(res, function(xData, yData) {
                    let temp = [];
                    xData.map((key, i) => {
                        temp.push({ x: xData[i], y: yData[i] });
                    });
                    setData(temp);
                    toggleIsLoading(false);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const headStyles = {
        margin: 20
    };

    const loadingStyles = {
      width: 1000,
      height: 500
    }

    return (
        <div className="App">
            <div className="container">
                <button
                    onClick={getData}
                    className="btn btn-lg btn-outline-dark"
                    style={headStyles}>
                    PM2.5 sensor data visualization
                </button>
                {!isLoading ? (
                    <XYPlot xType="time" height={500} width={1000}>
                        <XAxis title="Time" />
                        <YAxis title="PM2.5 concentration (ug/m2)" />
                        <LineSeries data={data} />
                    </XYPlot>
                ) : (
                    <div>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
