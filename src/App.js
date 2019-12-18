import React, { useEffect, useState } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { XYPlot, LineSeries } from "react-vis";
import extractData from "./lib/data";

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    setInterval(
    fetch("https://tgr2020-quiz.firebaseio.com/quiz/sensor/team32.json")
      .then(res => res.json())
      .then(res => {
        let [xData,yData] = extractData(res)
        let temp = []
        xData.map(i=>{
          console.log({x:xData[i],y:yData[i]})
          temp.push({x:xData[i],y:yData[i]})
        })
        setData(temp)
      })
      .catch(() => { console.log("error fetching data") }),5000)
  }
  );

  return (
    <div className="App">
      <XYPlot height={500} width={500}>
        <LineSeries data={data} />
      </XYPlot>
    </div>
  );
}

export default App;
