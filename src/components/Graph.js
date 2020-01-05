import React, { useState } from "react";
import { XYPlot, MarkSeries, XAxis, YAxis } from "react-vis";

export default function Graph(props) {
    return (
        <XYPlot xType="time" height={500} width={1000}>
            <XAxis title="Time" />
            <YAxis title="PM2.5 sensor value" />
            <MarkSeries data={props.data} size={1} />
        </XYPlot>
    )
}