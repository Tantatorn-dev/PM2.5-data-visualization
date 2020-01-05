import React from "react";

export default function Title() {

    const headStyles = {
        margin: 20
    };

    return (
        <div className="container">
            <button
                className="btn btn-lg btn-outline-dark"
                style={headStyles}>
                PM2.5 sensor data visualization
                </button>
        </div>
    )
}