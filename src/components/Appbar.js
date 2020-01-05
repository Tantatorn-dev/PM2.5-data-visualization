import React from "react";

export default function Appbar() {

    const logoStyles = {
        height: 40,
        width: "auto",
    }

    return (<div><nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand">
            <img style={logoStyles} src="logo.png" />
            ไม่ต้องห่วงเพื่อนผมแบกเอง
                </a>
    </nav></div>)
}