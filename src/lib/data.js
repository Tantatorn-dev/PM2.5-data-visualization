export default function extractData(data, startDate, endDate, callback) {
    let sensorData = []
    let timeData = []
    Object.keys(data).map((key, index) => {
        if (Object.keys(data[key])[0] === 'DevEUI_uplink') {
            let temp = data[key]['DevEUI_uplink']
            if (temp['DevAddr'] === '14EF1432') {
                let sensorVal = Number.parseInt(temp['payload_hex'].substring(2, 4), 16)
                if (sensorVal != 191) {
                    if ((new Date(startDate)).getTime() <= (new Date(temp['Time'])).getTime()
                        && (new Date(temp['Time'])).getTime() <= (new Date(endDate)).getTime()) {
                        sensorData.push(sensorVal)
                        timeData.push(new Date(temp['Time']))
                    }
                }
            }
        }
    })
    callback(timeData, sensorData)
}
