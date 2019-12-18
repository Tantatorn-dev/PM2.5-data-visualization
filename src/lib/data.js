export default function extractData(data) {
    var sensorData = []
    var timeData = []
    Object.keys(data).map(async (key, index) => {
        if (Object.keys(data[key])[0] === 'DevEUI_uplink') {
            let temp =data[key]['DevEUI_uplink'] 
            if (temp['DevAddr'] === '14EF1432') {
                sensorData.push(Number.parseInt(temp['payload_hex'].substring(2, 4), 16))
                timeData.push(new Date(temp['Time']))
            }
        }
    })
    return [sensorData, timeData]
}
