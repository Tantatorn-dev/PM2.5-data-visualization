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
    }, [])

    return (
        <div className="App">
            <div className="container">
                <h1>PM2.5 sensor data visualization</h1>
                <button onClick={getData} className="btn btn-lg btn-primary">
                    load data
                </button>
                {!isLoading ? (
                    <XYPlot xType="time" height={500} width={1000}>
                        <XAxis title="Time" />
                        <YAxis title="PM2.5 concentration (ug/m2)" />
                        <LineSeries data={data} />
                    </XYPlot>
                ) : (
                    <h1>loading ...</h1>
                )}
            </div>
        </div>
    );
}

export default App;