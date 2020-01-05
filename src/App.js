import React, { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/react-vis/dist/style.css";
import extractData from "./lib/data";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Graph from "./components/Graph";
import Appbar from "./components/Appbar";
import Title from "./components/Title";

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

  const loadingStyles = {
    width: "3rem",
    height: "3rem",
    marginTop: 75
  };
  return (
    <div className="App">
      <Appbar />
      <Title />
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
            setEndDate(date)
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
          <Graph data={data} /> : <h1>loading ...</h1>
      }
    </div>
  );
}

export default App;
