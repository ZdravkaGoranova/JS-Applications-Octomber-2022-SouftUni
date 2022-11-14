async function getInfo() {
    console.log("TODO...");
    const stopInfoElement = document.getElementById("stopId");
    const stopId = stopInfoElement.value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId} `;
    const stopNameElement = document.getElementById("stopName");
    const busList = document.getElementById("buses");

    busList.innerHTML = '';//зануляване на списък от спирки
    stopInfoElement.value = '';//презаписва html за да занули полето

    try {
        const response = await fetch(url)
        const data = await response.json();

        // if (response.status !== 200) {
        //     throw new Error(`Stop ID  not found`)
        // }

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(([k, v]) => {
            const li = document.createElement("li");
            li.textContent = `Bus ${k} arrives in ${v} minutes`;
            busList.appendChild(li);
        });
    } catch (error) {
        stopNameElement.textContent = "Error ";
    }
    //  debugger;
}