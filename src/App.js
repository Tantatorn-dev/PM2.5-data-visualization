import React, { useState } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries, XAxis, YAxis } from "react-vis";
import extractData from "./lib/data";

function App() {
  const [data, setData] = useState([])

  const getData = () => {
    fetch("https://tgr2020-quiz.firebaseio.com/quiz/sensor/team32.json")
      .then(res => res.json())
      .then(res => {
        extractData(res,function(xData,yData) {
          let temp = []
          xData.map((key,i) => {
            temp.push({ x: xData[i], y: yData[i] })
          })
          setData(temp)
        })
      })
      .catch((error) => { console.log(error) })
  }


  return (
    <div className="App">
      <h1>PM2.5 sensor data visualization</h1>
      <button onClick={getData}>fetch data</button>
      <XYPlot xType="time" height={500} width={1000}>
        <XAxis title="Time"/>
        <YAxis title="PM2.5 sensor value"/>
        <LineSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default App;
