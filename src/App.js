import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import { XYPlot, MarkSeries, XAxis, YAxis } from "react-vis";
import extractData from "./lib/data";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [data, setData] = useState([])
  const [isLoading, toggleIsLoading] = useState(true)
  const [startDate, setStartDate] = useState(new Date("2019/12/17"))
  const [endDate, setEndDate] = useState(new Date("2020/01/04"))

  const getData = () => {
    toggleIsLoading(true)
    fetch("https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team32.json")
      .then(res => res.json())
      .then(res => {
        extractData(res, startDate, endDate, function (xData, yData) {
          let temp = []
          xData.map((key, i) => {
            temp.push({ x: xData[i], y: yData[i] })
          })
          setData(temp)
          toggleIsLoading(false)
        })
      })
      .catch((error) => { console.log(error) })
  }

  useEffect(() => {
    getData();
  }, []);

  const headStyles = {
    margin: 20
  };
  const loadingStyles = {
    width: "3rem",
    height: "3rem",
    marginTop: 75
  };
  const logoStyles = {
    height: 40,
    width: "auto",
  };
  return (
    <div className="App">
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand">
          <img style={logoStyles} src="logo.png" />
          ไม่ต้องห่วงเพื่อนผมแบกเอง
                </a>
      </nav>
      <div className="container">
        <button
          className="btn btn-lg btn-outline-dark"
          style={headStyles}>
          PM2.5 sensor data visualization
                </button>
      </div>
      <div>
        start
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date)
            getData()
          }}
          onClick={getData}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div>
        end
        <DatePicker
          selected={endDate}
          onChange={date => {
            setStartDate(date)
            getData()
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      {
        !isLoading ?
          (<XYPlot xType="time" height={500} width={1000}>
            <XAxis title="Time" />
            <YAxis title="PM2.5 sensor value" />
            <MarkSeries data={data} size={1} />
          </XYPlot>) : <h1>loading ...</h1>
      }
    </div>
  );
}

export default App;
